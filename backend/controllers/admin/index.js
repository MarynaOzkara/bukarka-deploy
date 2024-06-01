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

const {
  addBook,
  getBookById,
  updateBookById,
  deleteBookById,
  updateImages,
  deleteImage,
} = require("./books/books");

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
  addBook,
  getBookById,
  updateBookById,
  deleteBookById,
  updateImages,
  deleteImage,
};
