const { Schema, model, default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { handleMongooseError, patterns } = require("../helpers");

const cartSchema = new Schema(
  {
    cartItems: [
      {
        bookId: {
          type: ObjectId,
          ref: "Book",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
        summ: Number,
      },
    ],
    totalItems: {
      type: Number,
      default: 1,
    },
    cartTotal: Number,
    totalAfterDiscount: Number,
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
cartSchema.post("save", handleMongooseError);
const Cart = model("cart", cartSchema);
module.exports = { Cart };
