
export const PAYSTACK_KEY = 'pk_test_YOUR_KEY_HERE';
export const PLANS = [
  { id: 'weekly', title: 'Weekly Hook', price: 25, period: 'week', pesewas: 2500, popular: true },
  { id: 'monthly', title: 'Monthly', price: 59, period: 'month', pesewas: 5900, save: 'Save 40%' },
];
export const getPaystackConfig = (email, plan) => ({
  paystackKey: PAYSTACK_KEY,
  amount: plan.pesewas,
  billingEmail: email,
  currency: 'GHS',
  channels: ['mobile_money', 'card', 'bank', 'ussd'],
});
