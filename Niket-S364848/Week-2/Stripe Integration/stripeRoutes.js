const express = require('express');
const router = express.Router();
const stripeController = require('../controller/stripeController');
const { isAuthenticatedUser } = require("../middleware/AuthMiddleware");


const userRouter = express.Router();
router.post('/create-stripe-session-subscription',isAuthenticatedUser, stripeController.createStripeSession);
router.post('/webhook', isAuthenticatedUser, stripeController.handleWebhook);

module.exports = router;