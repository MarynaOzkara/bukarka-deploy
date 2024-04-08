const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");
const { Book } = require("../../../models/book");
const { Cart } = require("../../../models/cart");

const increaseItemQuantity = async (req, res) => {
  const { id } = req.user;
  const { bookId } = req.params;
  const { price } = await Book.findById({ _id: bookId }).select("price").exec();
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

    const increaseQuantity = await Cart.findOneAndUpdate(
      {
        user: id,
        "cartItems.bookId": bookId,
      },
      {
        $set: {
          "cartItems.$": {
            bookId,
            price,
            quantity: item.quantity + 1,
            summ: price * (item.quantity + 1),
          },
        },
        cartTotal: prevCartTotal + price * 1,
        totalItems: prevItemsTotal + 1,
      },

      { new: true }
    )
      .populate("cartItems.bookId", "_id title author")
      .select("-cartItems._id -createdAt -updatedAt -_id");
    res.status(200).json({
      message: `Book id: ${bookId} quantity increased by 1 item`,
      cart: increaseQuantity,
    });
  }
};
module.exports = ctrlWrapper(increaseItemQuantity);
