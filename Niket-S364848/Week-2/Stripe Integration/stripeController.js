const stripeService = require('../service/stripeService.js');
const stripeConfig = require("../config/stripe.js");
const stripe = require('stripe')(stripeConfig.STRIPE_CONFIG.SECRET_KEY);


const createStripeSession = async (req, res) => {
  console.log(req,req.user, "req")

  const userName = req.user.firstName+ " " + req.user.lastName;
  console.log(userName)

  const userEmail = req.user.email;

  let customer = await stripeService.getCustomerByEmail(userEmail);
  // console.log(customer, "Customer")
  if (!customer) {
    customer = await stripeService.createCustomer(userEmail, userName);
  } else {
    // If the customer exists, check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    // console.log(subscriptions, "subscriptions")

    if (subscriptions.data.length > 0) {
      // Customer already has an active subscription, send them to the billing portal
      const stripeSession = await stripeService.createBillingPortalSession(customer.id, "http://localhost:4200/");
      // console.log(stripeSession, "stripeSession")
      return res.json({ redirectUrl: stripeSession.url });
    }
  }

  const session = await stripeService.createCheckoutSession(
    customer,
    {
      price_data: {
        currency: 'inr', 
        product_data: { name: 'Standard', description: 'Custom downloadable form, Advanced security features, Controlled url sharing, Download stamping, Advanced analytics' },
        unit_amount: 79900,
        recurring: { interval: 'month' },
      },
      quantity: 1,
    },
    "http://localhost:4200/", // Success URL
    "http://localhost:4200/"  // Cancel URL
  );

  res.json({ redirectUrl: session.url });
};

const handleWebhook = async (req, res) => {
  // const db = client.db("subDB");
  // const subscriptions = db.collection("subscriptions");
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripeService.handleStripeWebhook(req.body, sig, config.endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object;
    const subscription = await stripeService.retrieveSubscription(invoice.subscription);
    const customer = await stripeService.retrieveCustomer(invoice.customer);

    if (invoice.billing_reason === "subscription_create") {
      const subscriptionDocument = {
        userId: customer.metadata.userId,
        subId: subscription.id,
        endDate: subscription.current_period_end * 1000,
      };
      await subscriptions.insertOne(subscriptionDocument);
      console.log(`First subscription payment successful for ${customer.email}`);
    } else if (invoice.billing_reason === "subscription_cycle") {
      await subscriptions.updateOne(
        { userId: customer.metadata.userId },
        { $set: { endDate: subscription.current_period_end * 1000, recurringSuccessful_test: true } }
      );
      console.log(`Recurring subscription payment successful for ${invoice.id}`);
    }
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object;
    if (subscription.cancel_at_period_end) {
      console.log(`Subscription ${subscription.id} was canceled.`);
    } else {
      console.log(`Subscription ${subscription.id} was restarted.`);
    }
  }

  res.status(200).end();
};

const createBillingPortalSession = async (req, res) => {
  const { customerId } = req.body;
  try {
    const session = await stripeService.createBillingPortalSession(customerId, "http://localhost:3000/");
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStripeSession,
  handleWebhook,
  createBillingPortalSession,
};
