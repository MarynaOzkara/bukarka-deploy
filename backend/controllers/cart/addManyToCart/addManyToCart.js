const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { Book } = require("../../../models/book");
const { Cart } = require("../../../models/cart");

const addManyToCart = async (req, res) => {
  const { id } = req.user;
  const { cart } = req.body;
  let cartItems = [];
  const existCart = await Cart.findOne({ user: id });

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    let { price } = await Book.findById(cart[i].bookId).select("price").exec();

    object.bookId = cart[i].bookId;
    object.quantity = cart[i].quantity;
    object.price = price;
    object.summ = cart[i].quantity * price;

    cartItems.push(object);
  }
  let totalItems = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalItems = totalItems + cartItems[i].quantity;
  }
  let cartTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    cartTotal = cartTotal + cartItems[i].summ;
  }
  if (existCart) {
    const updateCart = await Cart.findOneAndUpdate(
      { user: id },
      {
        cartItems,
        totalItems,
        cartTotal,
      },
      { new: true }
    )
      .populate("cartItems.bookId", "_id imagesUrls title author")
      .select("-cartItems._id -createdAt -updatedAt -_id");
    res.status(200).json({
      message: `Books successfully added to your cart`,
      cart: updateCart,
    });
  } else {
    const newCart = await new Cart({
      cartItems,
      totalItems,
      cartTotal,
      user: id,
    }).save();
    const createCart = await newCart.populate(
      "cartItems.bookId",
      "_id imagesUrls title author"
    );

    res.json({
      message: "Books successfully added to your cart",
      cart: createCart,
    });
  }
};
module.exports = ctrlWrapper(addManyToCart);
