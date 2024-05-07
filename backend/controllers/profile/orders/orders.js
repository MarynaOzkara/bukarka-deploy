const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");
const { Checkout } = require("../../../models/checkout");
const { User } = require("../../../models/user");

const getAllOrders = async (req, res) => {
  const { id } = req.user;

  const orders = await Checkout.find({ user: id })
    .select(
      "orderNumber paymentMetod checkoutItems totalPrice createdAt orderStatus"
    )
    .populate("checkoutItems.bookId", "_id title author");

  res.status(200).json({ orders });
};
const getOrederById = async (req, res) => {
  const { id } = req.user;
  const { orderId } = req.params;
  const order = await Checkout.findById(orderId);
  if (order.user.toString() !== id.toString()) {
    throw HttpError(404, "Order not found");
  }
  if (!order) {
    throw HttpError(404, "Order not found");
  }
  res.json({ order });
};
module.exports = {
  getAllOrders: ctrlWrapper(getAllOrders),
  getOrederById: ctrlWrapper(getOrederById),
};
