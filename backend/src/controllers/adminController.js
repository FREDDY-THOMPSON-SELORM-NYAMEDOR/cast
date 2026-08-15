const { listVideos, createVideo, uploadImageToCloudinary, getSubscriptions } = require('../../store');

async function listAllVideos(req, res) {
  try {
    const videos = await listVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createNewVideo(req, res) {
  try {
    const video = await createVideo(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function uploadImage(req, res) {
  try {
    const { imageUrl, folder = 'cast' } = req.body;
    if (!imageUrl) return res.status(400).json({ message: 'imageUrl is required.' });
    const result = await uploadImageToCloudinary(imageUrl, folder);
    res.json({ secureUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function listAllSubscriptions(req, res) {
  try {
    const subs = await getSubscriptions();
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { listAllVideos, createNewVideo, uploadImage, listAllSubscriptions };
