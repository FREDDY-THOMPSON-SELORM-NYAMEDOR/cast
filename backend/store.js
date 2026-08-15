const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;

const dataFile = path.join(__dirname, '.data.json');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function defaultStore() {
  return {
    users: [],
    videos: [
      {
        id: 'ep-1',
        title: 'The Moon Lantern',
        description: 'A magical teaser introducing the brave child and her first adventure.',
        episodeNumber: 1,
        isPremium: false,
        thumbnail: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80',
        duration: '03:20'
      },
      {
        id: 'ep-2',
        title: 'The Secret River',
        description: 'Continue the story with a premium chapter unlocking the hidden path.',
        episodeNumber: 2,
        isPremium: true,
        thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
        duration: '05:14'
      }
    ],
    subscriptions: []
  };
}

function loadStore() {
  if (!fs.existsSync(dataFile)) {
    saveStore(defaultStore());
    return defaultStore();
  }

  const raw = fs.readFileSync(dataFile, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (error) {
    fs.writeFileSync(dataFile, JSON.stringify(defaultStore(), null, 2));
    return defaultStore();
  }
}

function saveStore(store) {
  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2));
}

let store = loadStore();
let mongoReady = false;
let UserModel;
let VideoModel;
let SubscriptionModel;

function getStore() {
  return store;
}

function createSchemas() {
  if (UserModel) return;

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    provider: String,
    password: String,
    subscription: { type: String, default: null },
    isPremium: { type: Boolean, default: false }
  }, { timestamps: true });

  const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    episodeNumber: Number,
    isPremium: { type: Boolean, default: false },
    thumbnail: String,
    duration: String
  }, { timestamps: true });

  const subscriptionSchema = new mongoose.Schema({
    reference: { type: String, required: true, unique: true },
    email: String,
    amount: Number,
    network: String,
    status: String,
    provider: String,
    paymentDetails: Object
  }, { timestamps: true });

  UserModel = mongoose.model('User', userSchema);
  VideoModel = mongoose.model('Video', videoSchema);
  SubscriptionModel = mongoose.model('Subscription', subscriptionSchema);
}

async function initializeStore() {
  const connectionUri = process.env.MONGODB_URL || process.env.MONGODB_URI;
  if (connectionUri) {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(connectionUri, { autoIndex: true });
      createSchemas();
      mongoReady = true;
      console.log('MongoDB connected');
      await seedVideos();
      return;
    } catch (error) {
      console.warn('MongoDB unavailable, using local JSON store:', error.message);
    }
  }

  store = loadStore();
}

async function seedVideos() {
  if (!mongoReady || !VideoModel) return;
  const count = await VideoModel.countDocuments();
  if (count === 0) {
    await VideoModel.insertMany(defaultStore().videos.map((video) => ({ ...video, id: undefined })));
  }
}

async function createUser(payload) {
  const { email, phone, password, name, provider } = payload;

  if (mongoReady) {
    const existing = await UserModel.findOne({ $or: [{ email }, { phone }] });
    if (existing) throw new Error('User already exists.');
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;
    const user = await UserModel.create({
      name: name || 'Cast Member',
      email: email || null,
      phone: phone || null,
      provider,
      password: hashedPassword,
      subscription: null,
      isPremium: false
    });
    const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    await sendWelcomeEmail(email, name);
    return { ...user.toObject(), id: user._id.toString(), token };
  }

  const existing = store.users.find((user) => user.email === email || user.phone === phone);
  if (existing) throw new Error('User already exists.');

  const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;
  const user = {
    id: `user-${Date.now()}`,
    name: name || 'Cast Member',
    email: email || null,
    phone: phone || null,
    provider,
    password: hashedPassword,
    subscription: null,
    isPremium: false,
    createdAt: new Date().toISOString()
  };

  store.users.push(user);
  saveStore(store);
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
  await sendWelcomeEmail(email, name);
  return { ...user, token };
}

async function authenticateUser(payload) {
  const { email, phone, password } = payload;

  if (mongoReady) {
    const user = await UserModel.findOne({ $or: [{ email }, { phone }] });
    if (!user || !user.password) return null;
    if (!bcrypt.compareSync(password, user.password)) return null;
    const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    return { ...user.toObject(), id: user._id.toString(), token };
  }

  const user = store.users.find((entry) => entry.email === email || entry.phone === phone);
  if (!user || !user.password) return null;
  if (!bcrypt.compareSync(password, user.password)) return null;
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
  return { ...user, token };
}

async function createVideo(payload) {
  const videoData = {
    title: payload.title || 'Untitled episode',
    description: payload.description || 'Story description',
    episodeNumber: Number(payload.episodeNumber || store.videos.length + 1),
    isPremium: Boolean(payload.isPremium),
    thumbnail: payload.thumbnail || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    duration: payload.duration || '03:45'
  };

  if (mongoReady) {
    const video = await VideoModel.create(videoData);
    return { ...video.toObject(), id: video._id.toString() };
  }

  const video = { id: payload.id || `ep-${Date.now()}`, ...videoData };
  store.videos.push(video);
  saveStore(store);
  return video;
}

async function createSubscription(payload) {
  if (mongoReady) {
    const subscription = await SubscriptionModel.create({
      ...payload,
      status: payload.status || 'pending',
      provider: payload.provider || 'paystack'
    });
    return { ...subscription.toObject(), id: subscription._id.toString() };
  }

  const subscription = { id: `sub-${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
  store.subscriptions.push(subscription);
  saveStore(store);
  return subscription;
}

async function markSubscriptionSuccessful(reference, status, payload) {
  if (mongoReady) {
    const subscription = await SubscriptionModel.findOneAndUpdate(
      { reference },
      { status, paymentDetails: payload },
      { new: true }
    );
    return subscription ? { ...subscription.toObject(), id: subscription._id.toString() } : null;
  }

  const subscription = store.subscriptions.find((entry) => entry.reference === reference);
  if (!subscription) return null;
  subscription.status = status;
  subscription.paymentDetails = payload;
  subscription.updatedAt = new Date().toISOString();
  saveStore(store);
  return subscription;
}

async function getSubscriptions() {
  if (mongoReady) {
    const subscriptions = await SubscriptionModel.find({}).sort({ createdAt: -1 });
    return subscriptions.map((subscription) => ({ ...subscription.toObject(), id: subscription._id.toString() }));
  }
  return store.subscriptions;
}

async function listVideos() {
  if (mongoReady) {
    const videos = await VideoModel.find({}).sort({ episodeNumber: 1 });
    return videos.map((video) => ({ ...video.toObject(), id: video._id.toString() }));
  }
  return store.videos.map((video) => ({ ...video }));
}

async function uploadImageToCloudinary(imageUrl, folder = 'cast') {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageUrl, { folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

async function sendWelcomeEmail(email, name) {
  if (!email || !process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL || process.env.SMTP_USER,
    to: email,
    subject: 'Welcome to Cast',
    html: `<p>Hello ${name || 'there'},</p><p>Your Cast account is ready. Enjoy free teaser episodes and unlock premium stories when you subscribe.</p>`
  });
}

module.exports = {
  initializeStore,
  getStore,
  saveStore,
  createUser,
  authenticateUser,
  createVideo,
  createSubscription,
  markSubscriptionSuccessful,
  getSubscriptions,
  listVideos,
  uploadImageToCloudinary
};
