const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { Cart } = require("../../../models/cart");
const { User } = require("../../../models/user");
const { Book } = require("../../../models/book");

const userCart = async (req, res) => {
  const { id } = req.user;
  const { cart } = req.body;
  let books = [];

  const user = await User.findById(id).select("-password");
  let cartExistByThisUser = await Cart.findOne({ orderedBy: id });
  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("Remove old cart");
  }
  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.book = cart[i].id;
    object.count = cart[i].count;
    let { price } = await Book.findById(cart[i].id).select("price").exec();
    object.price = price;
    books.push(object);
  }
  console.log("books", books);
  let cartTotal = 0;
  for (let i = 0; i < books.length; i++) {
    cartTotal = cartTotal + books[i].price * books[i].count;
  }
  console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    books,
    cartTotal,
    orderedBy: user._id,
  }).save();
  res.json(newCart);
};
module.exports = { userCart: ctrlWrapper(userCart) };
