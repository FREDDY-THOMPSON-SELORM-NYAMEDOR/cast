const express = require('express');
const router = express.Router();
const { initializePayment, verifyPayment, handleWebhook } = require('../controllers/paymentController');

router.post('/subscribe', initializePayment);
router.get('/verify', verifyPayment);
router.post('/webhook/paystack', handleWebhook);

module.exports = router;
