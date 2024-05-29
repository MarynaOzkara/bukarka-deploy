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
const { feedback } = require("./feedback/feedback");
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
  feedback,
  addBook,
  getBookById,
  updateBookById,
  deleteBookById,
  updateImages,
  deleteImage,
};
