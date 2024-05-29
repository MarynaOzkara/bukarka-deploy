const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");
const { Book } = require("../../../models/book");

const addBook = async (req, res) => {
  const imagesUrls = req.images;

  const {
    author,
    title,
    language,
    publisher,
    price,
    rating,
    category,
    subcategory,
    age,
    genre,
    format,
    cover,
    pages,
    year,
    promotions,
    bestsellers,
    description,
  } = req.body;
  if (
    !author ||
    !title ||
    !language ||
    !publisher ||
    !price ||
    !rating ||
    !category ||
    !subcategory ||
    !format ||
    !cover ||
    !pages ||
    !year ||
    !promotions ||
    !bestsellers ||
    !description
  ) {
    throw HttpError(400, "Please fill in all required fields");
  }
  const bookExist = await Book.findOne({ title });
  if (bookExist) {
    throw HttpError(409, `This book ${title} has already added`);
  }
  const newBook = await new Book({
    author,
    title,
    language,
    publisher,
    price,
    rating,
    category,
    subcategory,
    age,
    genre,
    format,
    cover,
    pages,
    year,
    new: req.body.new,
    promotions,
    bestsellers,
    description,
    imagesUrls,
  }).save();
  res.status(201).json({
    status: 201,
    message: `Book ${title} added successfully`,
    book: newBook,
  });
};
const getBookById = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!book) {
    throw HttpError(404, `Book with ID: ${bookId} not found`);
  }
  res.json({ book });
};
const deleteBookById = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndDelete(bookId);
  if (!book) {
    throw HttpError(404, `Book with ID: ${bookId} not found`);
  }
  res
    .status(200)
    .json({ messege: `Book with ID: ${bookId} deleted successfully` });
};
const updateBookById = async (req, res) => {
  const { bookId } = req.params;
  const bookNewData = req.body;

  const book = await Book.findByIdAndUpdate(bookId, bookNewData, { new: true });
  if (!book) {
    throw HttpError(404, `Book with ID: ${bookId} not found`);
  }
  res.status(200).json({ book });
};
const updateImages = async (req, res) => {
  const { bookId } = req.params;
  const imagesUrls = req.images;

  const existBook = await Book.findById(bookId);
  if (!existBook) {
    throw HttpError(404, `Book with ID: ${bookId} not found`);
  }

  existBook.imagesUrls = imagesUrls;
  await existBook.save();
  res.status(200).json({
    status: 200,
    message: `Images added successfully`,
    book: existBook,
  });
};
const deleteImage = async (req, res) => {
  res.status(200).json("Image deleted successfully");
};
module.exports = {
  addBook: ctrlWrapper(addBook),
  getBookById: ctrlWrapper(getBookById),
  deleteBookById: ctrlWrapper(deleteBookById),
  updateBookById: ctrlWrapper(updateBookById),
  updateImages: ctrlWrapper(updateImages),
  deleteImage: ctrlWrapper(deleteImage),
};
