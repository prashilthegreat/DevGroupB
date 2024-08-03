const stripeConfig = require("../config/stripe.js");
const stripeApiKey = stripeConfig.STRIPE_CONFIG.SECRET_KEY; 

const stripe = require('stripe')(stripeApiKey);

const createCustomer = async (email, name) => {
  return await stripe.customers.create({ email : email, name : name });
};

const getCustomerByEmail = async (email) => {
  const customers = await stripe.customers.list({ email, limit: 1 });
  return customers.data.length > 0 ? customers.data[0] : null;
};

const createCheckoutSession = async (customer, productDetails, successUrl, cancelUrl) => {
   return await stripe.checkout.sessions.create({
    customer: customer.id,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    line_items: [productDetails],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
};

const createBillingPortalSession = async (customerId, returnUrl) => {
  return await stripe.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl });
};

const handleStripeWebhook = (payload, sig, endpointSecret) => {
  return stripe.webhooks.constructEvent(payload, sig, endpointSecret);
};

const retrieveSubscription = async (subscriptionId) => {
  return await stripe.subscriptions.retrieve(subscriptionId);
};

const retrieveCustomer = async (customerId) => {
  return await stripe.customers.retrieve(customerId);
};

module.exports = {
  createCustomer,
  getCustomerByEmail,
  createCheckoutSession,
  createBillingPortalSession,
  handleStripeWebhook,
  retrieveSubscription,
  retrieveCustomer,
};
