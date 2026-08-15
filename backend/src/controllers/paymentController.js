const axios = require('axios');
const { createSubscription, markSubscriptionSuccessful } = require('../../store');

const PAYSTACK_KEY = process.env.PAYSTACK_SECRET_KEY;
const crypto = require('crypto');

async function initializePayment(req, res) {
  try {
    const { email, amount = 5, network = 'mtn', userId } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required.' });

    const reference = `cast-${Date.now()}`;
    const paymentPayload = {
      email,
      amount: Number(amount) * 100,
      currency: 'GHS',
      reference,
      channels: ['mobile_money'],
      metadata: { userId: userId || 'guest', plan: 'monthly', network, source: 'cast-app' }
    };

    if (PAYSTACK_KEY) {
      const response = await axios.post('https://api.paystack.co/transaction/initialize', paymentPayload, {
        headers: { Authorization: `Bearer ${PAYSTACK_KEY}` }
      });

      const subscription = await createSubscription({ reference, email, amount: Number(amount), network, status: 'pending', provider: 'paystack' });
      return res.json({ message: 'Payment initialized.', subscription, authorizationUrl: response.data.data.authorization_url, reference });
    }

    const fallbackSubscription = await createSubscription({ reference, email, amount: Number(amount), network, status: 'pending', provider: 'mock' });
    return res.json({ message: 'Payment initialized in mock mode.', subscription: fallbackSubscription, authorizationUrl: `https://paystack.com/pay/${reference}`, reference });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function verifyPayment(req, res) {
  try {
    const { reference } = req.query;
    if (!reference) return res.status(400).json({ message: 'Reference is required.' });

    if (PAYSTACK_KEY) {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, { headers: { Authorization: `Bearer ${PAYSTACK_KEY}` } });
      const status = response.data.data.status === 'success' ? 'active' : 'failed';
      const updated = await markSubscriptionSuccessful(reference, status, response.data.data);
      return res.json({ success: status === 'active', status, subscription: updated });
    }

    const updated = await markSubscriptionSuccessful(reference, 'active', { status: 'mock-success' });
    return res.json({ success: true, status: 'active', subscription: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { initializePayment, verifyPayment };

async function handleWebhook(req, res) {
  try {
    const signature = req.headers['x-paystack-signature'];
    if (!signature) return res.status(400).send('Missing signature');

    if (!PAYSTACK_KEY) return res.status(400).send('Paystack not configured');

    const hash = crypto.createHmac('sha512', PAYSTACK_KEY).update(req.rawBody || JSON.stringify(req.body)).digest('hex');
    if (hash !== signature) {
      return res.status(400).send('Invalid signature');
    }

    const event = req.body;
    // Handle transaction.success events
    if (event && event.event === 'charge.success' || (event && event.event === 'transaction.success')) {
      const data = event.data || event;
      const reference = data.reference || (data.transaction && data.transaction.reference);
      if (reference) {
        await markSubscriptionSuccessful(reference, 'active', data);
      }
    }

    return res.status(200).send('OK');
  } catch (error) {
    return res.status(500).send('error');
  }
}

module.exports.handleWebhook = handleWebhook;
