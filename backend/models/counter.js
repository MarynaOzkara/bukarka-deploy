const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const counterSchema = new Schema(
  {
    orderNumber: {
      type: Number,
      default: 1,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

counterSchema.post("save", handleMongooseError);

const Counter = model("Counter", counterSchema);

module.exports = { Counter };
