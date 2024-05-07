const { Cart } = require("../../models/cart");
const { User } = require("../../models/user");
const { Checkout } = require("../../models/checkout");
const { HttpError } = require("../../helpers");
const ctrlWrapper = require("../../decorators/ctrlWrapper");

const createCheckout = async (req, res) => {
  const {
    city,
    deliveryMetod,
    address,
    deliveriAmount,
    paymentMetod,
    message,
  } = req.body;
  const { id } = req.user;

  const user = await User.findById(id).select("-password");
  if (!user) {
    throw HttpError(404, "User does not exist");
  }
  const { name, surname, email, phone } = user;
  const { cartItems, cartTotal, totalItems } = await Cart.findOne({ user: id });
  if (cartTotal < 500 && deliveriAmount !== 0) {
    total = cartTotal + deliveriAmount;
  } else {
    total = cartTotal;
  }
  const newCheckout = new Checkout({
    checkoutItems: cartItems,
    totalItems,
    itemsPrice: cartTotal,
    deliveriAmount,
    totalPrice: total,
    userInfo: { name, surname, email, phone },
    deliveryInfo: { city, deliveryMetod, address },
    paymentMetod,
    user: id,
    message,
  });
  newCheckout.save();
  const { _id } = newCheckout;
  res.status(201).json({
    status: 201,
    message: "Checkout created successfull",
    orderId: _id,
  });
};

module.exports = {
  createCheckout: ctrlWrapper(createCheckout),
};
