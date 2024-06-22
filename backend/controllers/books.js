const { Book } = require("../models/book");
// const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const { query } = require("express");
const { HttpError } = require("../helpers");

const getAll = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const data = await Book.find().skip(skip).limit(limit);
  const total = await Book.countDocuments();

  res.json({
    total,
    page,
    limit,
    data,
  });
};

const getBooksByType = async (req, res) => {
  const bestsellers = await Book.find({ bestsellers: true });
  const newBooks = await Book.find({ new: true });
  const promotions = await Book.find({ promotions: true });

  res.json({
    bestsellers,
    newBooks,
    promotions,
  });
};

const getBestsellers = async (req, res) => {
  const total = await Book.countDocuments({ bestsellers: true });
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const data = await Book.find({ bestsellers: true }).skip(skip).limit(limit);
  res.json({
    total,
    page,
    limit,
    data,
  });
};

const getNewBooks = async (req, res) => {
  const total = await Book.countDocuments({ new: true });
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const data = await Book.find({ new: true }).skip(skip).limit(limit);
  res.json({
    total,
    page,
    limit,
    data,
  });
};

const getPromotions = async (req, res) => {
  const total = await Book.countDocuments({ promotions: true });
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const data = await Book.find({ promotions: true }).skip(skip).limit(limit);
  res.json({
    total,
    page,
    limit,
    data,
  });
};

const filtersBooks = async (req, res) => {
  const {
    keyword,
    promotions,
    bestsellers,
    category,
    subcategory,
    language,
    author,
    publisher,
    priceMin,
    priceMax,
    ratingMin,
    ratingMax,
    sortBy,
    orderSort,
  } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const match = {};
  const sort = {};

  if (keyword) {
    match.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { author: { $regex: keyword, $options: "i" } },
    ];
  }
  if (category) {
    match.category = { $regex: category, $options: "i" };
  }
  if (subcategory) {
    match.subcategory = { $regex: subcategory, $options: "i" };
  }
  if (language) {
    match.language = { $regex: language, $options: "i" };
  }
  if (author) {
    match.author = { $regex: author, $options: "i" };
  }
  if (publisher) {
    match.publisher = { $regex: publisher, $options: "i" };
  }
  if (promotions) {
    match.promotions = true;
  }
  if (bestsellers) {
    match.bestsellers = true;
  }
  if (req.query.new) {
    match.new = true;
  }
  if (priceMin || priceMax) {
    match.price = {};
    if (priceMin) {
      match.price.$gte = +priceMin;
    }
    if (priceMax) {
      match.price.$lte = +priceMax;
    }
  }
  if (ratingMin || ratingMax) {
    match.rating = {};
    if (ratingMin) {
      match.rating.$gte = +ratingMin;
    }
    if (ratingMax) {
      match.rating.$lte = +ratingMax;
    }
  }
  if (sortBy && orderSort) {
    sort[sortBy] = orderSort === "asc" ? 1 : -1;
  }

  const books = await Book.find(match).skip(skip).limit(limit).sort(sort);
  const total = await Book.countDocuments(match);
  if (!books) {
    throw HttpError(404, "Books not found");
  }
  if (total === 0) {
    res.status(404).json({ massage: "Books not found" });
  }

  res.status(200).json({
    total,
    page,
    limit,
    books,
  });
};

const getBooksByIds = async (req, res) => {
  const { sortBy, orderSort, ids } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const match = {
    _id: {
      $in: ids || [],
    },
  };
  const sort = {};

  if (sortBy && orderSort) {
    sort[sortBy] = orderSort === "asc" ? 1 : -1;
  }

  const books = await Book.find(match).skip(skip).limit(limit).sort(sort);
  const total = await Book.countDocuments(match);
  if (!books) {
    throw HttpError(404, "Books not found");
  }
  if (total === 0) {
    res.status(404).json({ massage: "Books not found" });
  }

  res.status(200).json({
    total,
    page,
    limit,
    books,
  });
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    throw HttpError(404, `Book with id=${id} not found`);
  }
  res.json(book);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getBooksByType: ctrlWrapper(getBooksByType),
  getBestsellers: ctrlWrapper(getBestsellers),
  getNewBooks: ctrlWrapper(getNewBooks),
  getPromotions: ctrlWrapper(getPromotions),
  filtersBooks: ctrlWrapper(filtersBooks),
  getBookById: ctrlWrapper(getBookById),
  getBooksByIds: ctrlWrapper(getBooksByIds),
};
