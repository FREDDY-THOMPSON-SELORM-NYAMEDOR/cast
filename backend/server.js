const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const {
  initializeStore,
  createUser,
  authenticateUser,
  createVideo,
  createSubscription,
  markSubscriptionSuccessful,
  getSubscriptions,
  listVideos,
  uploadImageToCloudinary
} = require('./store');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false }));

initializeStore().catch((error) => {
  console.error('Store initialization failed', error);
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'cast-backend', mode: process.env.NODE_ENV || 'development' });
});

app.post('/auth', async (req, res) => {
  try {
    const { action = 'login', email, phone, password, name, provider = 'email' } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: 'Provide an email or phone number.' });
    }

    if (action === 'register') {
      const user = await createUser({ email, phone, password, name, provider });
      return res.status(201).json({ user, token: user.token });
    }

    const user = await authenticateUser({ email, phone, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    return res.json({ user, token: user.token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/videos', async (_req, res) => {
  try {
    const videos = await listVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/subscribe', async (req, res) => {
  try {
    const { email, amount = 5, network = 'mtn', userId } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const reference = `cast-${Date.now()}`;
    const paymentPayload = {
      email,
      amount: Number(amount) * 100,
      currency: 'GHS',
      reference,
      channels: ['mobile_money'],
      metadata: {
        userId: userId || 'guest',
        plan: 'monthly',
        network,
        source: 'cast-app'
      }
    };

    if (process.env.PAYSTACK_SECRET_KEY) {
      const axios = require('axios');
      const response = await axios.post('https://api.paystack.co/transaction/initialize', paymentPayload, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const subscription = await createSubscription({
        reference,
        email,
        amount: Number(amount),
        network,
        status: 'pending',
        provider: 'paystack'
      });

      return res.json({ message: 'Payment initialized.', subscription, authorizationUrl: response.data.data.authorization_url, reference });
    }

    const fallbackSubscription = await createSubscription({
      reference,
      email,
      amount: Number(amount),
      network,
      status: 'pending',
      provider: 'mock'
    });

    return res.json({ message: 'Payment initialized in mock mode.', subscription: fallbackSubscription, authorizationUrl: `https://paystack.com/pay/${reference}`, reference });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/verify', async (req, res) => {
  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({ message: 'Reference is required.' });
    }

    if (process.env.PAYSTACK_SECRET_KEY) {
      const axios = require('axios');
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
      });

      const status = response.data.data.status === 'success' ? 'active' : 'failed';
      const updated = await markSubscriptionSuccessful(reference, status, response.data.data);
      return res.json({ success: status === 'active', status, subscription: updated });
    }

    const updated = await markSubscriptionSuccessful(reference, 'active', { status: 'mock-success' });
    return res.json({ success: true, status: 'active', subscription: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/admin/videos', async (_req, res) => {
  try {
    const videos = await listVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/admin/videos', async (req, res) => {
  try {
    const video = await createVideo(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/admin/upload-image', async (req, res) => {
  try {
    const { imageUrl, folder = 'cast' } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: 'imageUrl is required.' });
    }

    const result = await uploadImageToCloudinary(imageUrl, folder);
    res.json({ secureUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/admin/subscriptions', async (_req, res) => {
  try {
    const subscriptions = await getSubscriptions();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Cast backend listening on port ${PORT}`);
  });
}

module.exports = app;
