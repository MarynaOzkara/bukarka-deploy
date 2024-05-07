const {
  getAllUsers,
  getUserById,
  getAllSubscribers,
  updateUser,
  deleteUser,
} = require("./users/users");
const {
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("./orders/orders");

module.exports = {
  getAllUsers,
  getUserById,
  getAllSubscribers,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
