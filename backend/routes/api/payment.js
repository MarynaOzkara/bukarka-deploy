const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares");

const paymentController = require("../../controllers/payment/index");

router.get("/stripe/config", authenticate, paymentController.stripeConfig);
router.post("/stripe/:orderId", authenticate, paymentController.stripePayment);
router.get(
  "/stripe/success/:orderId",
  authenticate,
  paymentController.stripePaymentSuccess
);

module.exports = router;
