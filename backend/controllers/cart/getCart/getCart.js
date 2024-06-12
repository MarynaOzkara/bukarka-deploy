const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");
const { Cart } = require("../../../models/cart");

const getCart = async (req, res) => {
  const { id } = req.user;
  const cart = await Cart.findOne({ user: id })
    .populate("cartItems.bookId", "_id imagesUrls title author")
    .select("-cartItems._id -createdAt -updatedAt -_id");
  if (!cart) {
    throw HttpError(404, "Cart is empty");
  }

  res.status(200).json({ cart: cart });
};
module.exports = ctrlWrapper(getCart);
