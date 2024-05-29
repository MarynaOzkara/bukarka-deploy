const { Checkout } = require("../../../models/checkout");
const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");
const { changeOrderStatus } = require("../../../utils/emailTemplates");
const { sendEmail } = require("../../../servises/emailServise/emailServise");

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
  res.status(200).json({ order });
};
const updateOrder = async (req, res) => {
  const { orderNumber } = req.params;
  const { orderStatus } = req.body;
  const order = await Checkout.findOne({ orderNumber });
  if (!order) {
    throw HttpError(404, "Order not found");
  }
  const { userInfo } = order;
  order.orderStatus = orderStatus;
  order.save();
  const email = userInfo.email;
  const name = userInfo.name;
  const message = changeOrderStatus(name, orderNumber, orderStatus);
  try {
    await sendEmail({
      email: email,
      subject: "Зміна статусу замовлення",
      message,
    });
    res.status(200).json({
      message: `Order's status changed to ${orderStatus}. More info sent to your email: ${email}`,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const deleteOrder = async (req, res) => {
  const { orderNumber } = req.params;
  const order = await Checkout.findOne({ orderNumber });
  if (!order) {
    throw HttpError(404, "Order not found");
  }

  res.status(200).json(`Order number: ${orderNumber} is deleted`);
};
module.exports = {
  getAllOrders: ctrlWrapper(getAllOrders),
  getOrderById: ctrlWrapper(getOrderById),
  updateOrder: ctrlWrapper(updateOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
};
