const express = require('express');
const router = express.Router();
const { listAllVideos, createNewVideo, uploadImage, listAllSubscriptions } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../../middleware/authMiddleware');

router.use(authMiddleware, adminMiddleware);

router.get('/videos', listAllVideos);
router.post('/videos', createNewVideo);
router.post('/upload-image', uploadImage);
router.get('/subscriptions', listAllSubscriptions);

module.exports = router;
