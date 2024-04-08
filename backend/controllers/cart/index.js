const addOneToCart = require("./addOneToCart/addOneToCart");
const getCart = require("./getCart/getCart");
const clearCart = require("./clearCart/clearCart");
const deleteItem = require("./deleteItem/deleteItem");
const decreaseItemQuantity = require("./decreaseItemQuantity/decreaseItemQuantity");
const increaseItemQuantity = require("./increaseItemQuantity/increaseItemQuantity");
const addManyToCart = require("./addManyToCart/addManyToCart");
module.exports = {
  addOneToCart,
  getCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  deleteItem,
  clearCart,
  addManyToCart,
};
