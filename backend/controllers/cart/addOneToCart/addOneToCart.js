const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");
const { Book } = require("../../../models/book");
const { Cart } = require("../../../models/cart");

const addOneToCart = async (req, res) => {
  const { id } = req.user;
  const { bookId } = req.params;

  const { price } = await Book.findById({ _id: bookId }).select("price").exec();
  let quantity = 1;
  const existCart = await Cart.findOne({ user: id }).exec();

  if (existCart) {
    const item = existCart.cartItems.find((el) => el.bookId == bookId);
    const prevCartTotal = existCart.cartTotal;
    const prevItemsTotal = existCart.totalItems;

    if (item) {
      const updateQuantity = await Cart.findOneAndUpdate(
        {
          user: id,
          "cartItems.bookId": bookId,
        },
        {
          $set: {
            "cartItems.$": {
              bookId,
              price,
              quantity: item.quantity + quantity,
              summ: price * (item.quantity + quantity),
            },
          },
          cartTotal: prevCartTotal + price * quantity,
          totalItems: prevItemsTotal + quantity,
        },

        { new: true }
      )
        .populate("cartItems.bookId", "_id title author")
        .select("-cartItems._id -createdAt -updatedAt -_id");

      res.status(200).json({
        message: `Book id: ${bookId} quantity increased by ${quantity} item`,
        cart: updateQuantity,
      });
    } else {
      const updateCart = await Cart.findOneAndUpdate(
        { user: id },
        {
          $push: {
            cartItems: {
              bookId,
              quantity,
              price,
              summ: price * quantity,
            },
          },
          cartTotal: prevCartTotal + price * quantity,
          totalItems: prevItemsTotal + quantity,
        },
        { new: true }
      )
        .populate("cartItems.bookId", "_id title author")
        .select("-cartItems._id -createdAt -updatedAt -_id");

      res.status(200).json({
        message: `Book with id: ${bookId} successfully added to the cart`,
        cart: updateCart,
      });
    }
  } else {
    const cart = await Cart.create({
      user: id,
      cartItems: [
        {
          bookId,
          quantity,
          price,
          summ: price * quantity,
        },
      ],
      cartTotal: price * quantity,
      totalItems: quantity,
    });
    const createCart = await cart.populate(
      "cartItems.bookId",
      "_id title author"
    );

    res.status(201).json({
      message: `Book with id: ${bookId} successfulli added to the cart`,
      cart: createCart,
    });
  }
};
module.exports = ctrlWrapper(addOneToCart);
