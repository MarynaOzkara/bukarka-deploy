const { Schema, model, default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { ObjectId } = mongoose.Schema;
const { handleMongooseError, patterns } = require("../helpers");

const checkoutSchema = new Schema(
  {
    checkoutItems: [
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
      },
    ],
    totalItems: Number,
    itemsPrice: Number,
    deliveriAmount: {
      type: Number,
      default: 0,
    },
    discountAmount: Number,
    totalPrice: Number,
    userInfo: {
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    deliveryInfo: {
      city: {
        type: String,
        required: true,
      },
      deliveryMetod: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    paymentMetod: {
      type: String,
      required: true,
      enum: ["Card", "After", "Bank"],
    },
    orderStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "In process", "Paid", "Cancelled", "Completed"],
    },
    message: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "user",
      // required: true,
    },
    orderNumber: Number,
  },
  { versionKey: false, timestamps: true }
);
checkoutSchema.plugin(AutoIncrement, { inc_field: "orderNumber" });
checkoutSchema.post("save", handleMongooseError);
const Checkout = model("checkout", checkoutSchema);
module.exports = { Checkout };
