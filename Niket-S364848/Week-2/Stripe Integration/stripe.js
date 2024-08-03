require('dotenv').config();


const STRIPE_CONFIG = {

    SECRET_KEY: process.env.STRIPE_SECRET_KEY,

    CURRENCY: 'INR',
  
    // Success URL for checkout
    SUCCESS_URL: 'http://localhost:4200/',
  
    // Cancel URL for checkout
    CANCEL_URL: 'http://localhost:4200/',
  
  
    // Webhook secret key 
    WEBHOOK_SECRET: 'STRIPE_WEBHOOK_SECRET_KEY',
  
}

module.exports = {
    STRIPE_CONFIG
}