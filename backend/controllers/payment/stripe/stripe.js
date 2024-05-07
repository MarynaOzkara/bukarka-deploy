const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");
const { Checkout } = require("../../../models/checkout");
const { User } = require("../../../models/user");
const { STRIPE_SECRET_KEY, BASE_URL } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const stripeConfig = async (req, res) => {
  res.send({ pablishebleKey: process.env.STRIPE_PUBLISHEBLE_KEY });
};

const stripePayment = async (req, res) => {
  const { orderId } = req.params;

  const { totalPrice } = await Checkout.findOne({
    _id: orderId,
  });
  // console.log(totalPrice);
  params = {
    payment_method_types: ["card"],
    amount: totalPrice * 100,
    currency: "uah",
  };

  const paymentIntent = await stripe.paymentIntents.create(params);
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

const stripePaymentSuccess = async (req, res) => {
  const { orderId } = req.params;

  const order = await Checkout.findOne({ _id: orderId });
  if (!order) {
    throw HttpError(404, "Order not found");
  }

  order.orderStatus = "Paid";
  order.save();
  res
    .status(200)
    .json({
      status: 200,
      message: "Order success paid",
      orderStatus: order.orderStatus,
    });
};
module.exports = {
  stripePayment: ctrlWrapper(stripePayment),
  stripeConfig: ctrlWrapper(stripeConfig),
  stripePaymentSuccess: ctrlWrapper(stripePaymentSuccess),
};
