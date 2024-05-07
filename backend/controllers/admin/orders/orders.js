const { Checkout } = require("../../../models/checkout");
const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");

const getAllOrders = async (req, res) => {
  const orders = await Checkout.find();
  const total = await Checkout.countDocuments();
  res.status(200).json({
    total,
    orders: orders,
  });
};
const getOrderById = async (req, res) => {
  const { orderNumber } = req.params;
  const order = await Checkout.findOne({ orderNumber });
  if (!order) {
    throw HttpError(404, "Order not found");
  }
  res.status(200).json(order);
};
const updateOrder = async (req, res) => {
  const { orderNumber } = req.params;
  const { orderStatus } = req.body;
  const order = await Checkout.findOne({ orderNumber });
  if (!order) {
    throw HttpError(404, "Order not found");
  }
  order.orderStatus = orderStatus;
  order.save();
  res.status(200).json(order);
};
const deleteOrder = async (req, res) => {
  const { orderNumber } = req.params;
  const order = await Checkout.findOne({ orderNumber });
  if (!order) {
    throw HttpError(404, "Order not found");
  }

  res.status(200).json("delete order");
};
module.exports = {
  getAllOrders: ctrlWrapper(getAllOrders),
  getOrderById: ctrlWrapper(getOrderById),
  updateOrder: ctrlWrapper(updateOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
};
