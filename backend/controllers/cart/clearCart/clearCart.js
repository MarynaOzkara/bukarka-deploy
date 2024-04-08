const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { Cart } = require("../../../models/cart");

const clearCart = async (req, res) => {
  const { id } = req.user;
  const cart = await Cart.findOne({ user: id });
  if (cart) {
    await Cart.findOneAndDelete({ user: id }).exec();

    res.status(200).json({ message: "Cart is empty" });
  } else {
    throw HttpError(404, "Cart not found");
  }
};
module.exports = ctrlWrapper(clearCart);
