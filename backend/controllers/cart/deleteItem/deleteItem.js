const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");
const { Cart } = require("../../../models/cart");

const deleteItem = async (req, res) => {
  const { id } = req.user;
  const { bookId } = req.params;
  const existCart = await Cart.findOne({ user: id }).exec();
  if (existCart) {
    const item = existCart.cartItems.find((el) => el.bookId == bookId);
    if (!item) {
      throw HttpError(
        404,
        `This book with id: ${bookId} is not added to your cart`
      );
    }
    const prevCartTotal = existCart.cartTotal;
    const prevItemsTotal = existCart.totalItems;
    const updateCart = await Cart.findOneAndUpdate(
      { user: id },
      {
        $pull: {
          cartItems: {
            bookId,
          },
        },
        cartTotal: prevCartTotal - item.price * item.quantity,
        totalItems: prevItemsTotal - item.quantity,
      },
      { new: true }
    )
      .populate("cartItems.bookId", "_id title author")
      .select("-cartItems._id -createdAt -updatedAt -_id");
    res.status(200).json({
      message: `Book id: ${bookId} successfully deleted from cart`,
      cart: updateCart,
    });
  }
};
module.exports = ctrlWrapper(deleteItem);
