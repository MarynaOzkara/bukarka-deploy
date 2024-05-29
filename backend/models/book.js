const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    language: String,
    publisher: String,
    price: Number,
    rating: Number,
    category: String,
    subcategory: String,
    age: String,
    genre: Array,
    format: String,
    cover: String,
    pages: Number,
    year: String,
    new: Boolean,
    promotions: Boolean,
    bestsellers: Boolean,
    description: String,
    image: String,
    imagesUrls: Array,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.post("save", handleMongooseError);

const Book = model("Book", bookSchema);
module.exports = { Book };
