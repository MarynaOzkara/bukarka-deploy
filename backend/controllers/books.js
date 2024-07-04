const { Book } = require("../models/book");
const Category = require("../models/category");
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
    subcategories,
    language,
    languages,
    author,
    authors,
    publisher,
    publishers,
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

  if (subcategories) {
    match.subcategory = {
      $in: subcategories.map((subcategory) => new RegExp(subcategory, "i")),
    };
  }

  if (language) {
    match.language = { $regex: language, $options: "i" };
  }

  if (languages) {
    match.language = {
      $in: languages.map((language) => new RegExp(language, "i")),
    };
  }

  if (author) {
    match.author = { $regex: author, $options: "i" };
  }

  if (authors) {
    match.author = {
      $in: authors.map((author) => new RegExp(author, "i")),
    };
  }

  if (publisher) {
    match.publisher = { $regex: publisher, $options: "i" };
  }

  if (publishers) {
    match.publisher = {
      $in: publishers.map((publisher) => new RegExp(publisher, "i")),
    };
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

// const filterBooks = async (req, res) => {
//   const {
//     promotions,
//     bestsellers,
//     subcategories,
//     languages,
//     authors,
//     publishers,
//     priceMin,
//     priceMax,
//     ratingMin,
//     ratingMax,
//     sortBy,
//     orderSort,
//     page = 1,
//     limit = 12,
//   } = req.body;

//   const skip = (page - 1) * limit;

//   const match = {};
//   const sort = {};

//   if (subcategories && subcategories.length > 0) {
//     match.subcategory = {
//       $in: subcategories.map((subcategory) => new RegExp(subcategory, "i")),
//     };
//   }
//   if (languages && languages.length > 0) {
//     match.language = { $in: languages };
//   }
//   if (authors && authors.length > 0) {
//     match.author = { $in: authors };
//   }
//   if (publishers && publishers.length > 0) {
//     match.publisher = { $in: publishers };
//   }
//   if (promotions) {
//     match.promotions = true;
//   }
//   if (bestsellers) {
//     match.bestsellers = true;
//   }
//   if (req.body.new) {
//     match.new = true;
//   }
//   if (priceMin !== undefined || priceMax !== undefined) {
//     match.price = {};
//     if (priceMin !== undefined) {
//       match.price.$gte = +priceMin;
//     }
//     if (priceMax !== undefined) {
//       match.price.$lte = +priceMax;
//     }
//   }
//   if (ratingMin !== undefined || ratingMax !== undefined) {
//     match.rating = {};
//     if (ratingMin !== undefined) {
//       match.rating.$gte = +ratingMin;
//     }
//     if (ratingMax !== undefined) {
//       match.rating.$lte = +ratingMax;
//     }
//   }
//   if (sortBy && orderSort) {
//     sort[sortBy] = orderSort === "asc" ? 1 : -1;
//   }

//   try {
//     console.log("Match criteria:", JSON.stringify(match, null, 2));

//     const books = await Book.find(match).skip(skip).limit(limit).sort(sort);
//     const total = await Book.countDocuments(match);

//     if (!books.length) {
//       return res.status(404).json({ message: "Books not found" });
//     }

//     res.status(200).json({
//       total,
//       page,
//       limit,
//       books,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const filterBooks = async (req, res) => {
  const {
    new: isNew,
    promotions,
    bestsellers,
    category,
    categories,
    subcategory,
    subcategories,
    language,
    languages,
    author,
    authors,
    publisher,
    publishers,
    age,
    ages,
    priceMin,
    priceMax,
    ratingMin,
    ratingMax,
    sortBy,
    orderSort,
    page = 1,
    limit = 12,
  } = req.query;

  const skip = (page - 1) * limit;

  const match = {};
  const sort = {};

  if (isNew !== undefined) {
    match.new = isNew === "true";
  }
  if (promotions !== undefined) {
    match.promotions = promotions === "true";
  }
  if (bestsellers !== undefined) {
    match.bestsellers = bestsellers === "true";
  }

  if (category) {
    match.category = { $regex: category, $options: "i" };
  }

  if (subcategory) {
    match.subcategory = { $regex: subcategory, $options: "i" };
  }
  if (language) {
    match.language = { $in: language.split(",") };
  }
  if (author) {
    match.author = { $in: author.split(",") };
  }
  if (publisher) {
    match.publisher = { $in: publisher.split(",") };
  }

  if (language) {
    match.language = { $regex: language, $options: "i" };
  }

  if (categories) {
    match.category = {
      $in: categories.map((category) => new RegExp(category, "i")),
    };
  }

  if (subcategories) {
    match.subcategory = {
      $in: subcategories.map((subcategory) => new RegExp(subcategory, "i")),
    };
  }

  if (languages) {
    match.language = {
      $in: languages.map((language) => new RegExp(language, "i")),
    };
  }

  if (authors) {
    match.author = {
      $in: authors.map((author) => new RegExp(author, "i")),
    };
  }

  if (publishers) {
    match.publisher = {
      $in: publishers.map((publisher) => new RegExp(publisher, "i")),
    };
  }

  if (age) {
    match.age = { $regex: age, $options: "i" };
  }

  if (ages) {
    match.age = {
      $in: ages.map((age) => new RegExp(age, "i")),
    };
  }

  if (priceMin !== undefined || priceMax !== undefined) {
    match.price = {};
    if (priceMin !== undefined) {
      match.price.$gte = +priceMin;
    }
    if (priceMax !== undefined) {
      match.price.$lte = +priceMax;
    }
  }

  if (ratingMin !== undefined || ratingMax !== undefined) {
    match.rating = {};
    if (ratingMin !== undefined) {
      match.rating.$gte = +ratingMin;
    }
    if (ratingMax !== undefined) {
      match.rating.$lte = +ratingMax;
    }
  }

  if (sortBy && orderSort) {
    sort[sortBy] = orderSort === "asc" ? 1 : -1;
  }

  try {
    console.log("Match criteria:", JSON.stringify(match, null, 2));
    const books = await Book.find(match).skip(skip).limit(limit).sort(sort);
    const total = await Book.countDocuments(match);

    if (!books.length) {
      return res.status(404).json({ message: "Books not found" });
    }

    res.status(200).json({
      total,
      page,
      limit,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

const getUniqueAuthors = async (req, res) => {
  try {
    const authors = await Book.aggregate([
      {
        $group: {
          _id: "$author",
        },
      },
      {
        $project: {
          _id: 0,
          author: "$_id",
        },
      },
    ]);

    console.log("Authors fetched: ", authors);
    res.json(authors);
  } catch (error) {
    console.error("Error fetching unique authors:", error);
    res.status(500).json({ message: "Server error while retrieving authors" });
  }
};

const getUniquePublishers = async (req, res) => {
  try {
    const publishers = await Book.aggregate([
      {
        $group: {
          _id: "$publisher",
        },
      },
      {
        $project: {
          _id: 0,
          publisher: "$_id",
        },
      },
    ]);

    console.log("Publishers fetched: ", publishers);
    res.json(publishers);
  } catch (error) {
    console.error("Error fetching unique publishers:", error);
    res
      .status(500)
      .json({ message: "Server error while retrieving publishers" });
  }
};

const getFilterData = async (req, res) => {
  try {
    const [
      authors,
      publishers,
      categories,
      priceStats,
      ratingStats,
      languages,
    ] = await Promise.all([
      Book.aggregate([
        {
          $group: {
            _id: "$author",
          },
        },
        {
          $project: {
            _id: 0,
            author: "$_id",
          },
        },
      ]),
      Book.aggregate([
        {
          $group: {
            _id: "$publisher",
          },
        },
        {
          $project: {
            _id: 0,
            publisher: "$_id",
          },
        },
      ]),

      Category.find().sort({ order: 1 }),

      Book.aggregate([
        {
          $group: {
            _id: null,
            priceMax: { $max: "$price" },
            priceMin: { $min: "$price" },
          },
        },
        {
          $project: {
            _id: 0,
            priceMax: 1,
            priceMin: 1,
          },
        },
      ]),

      Book.aggregate([
        {
          $group: {
            _id: null,
            ratingMax: { $max: "$rating" },
            ratingMin: { $min: "$rating" },
          },
        },
        {
          $project: {
            _id: 0,
            ratingMax: 1,
            ratingMin: 1,
          },
        },
      ]),

      Book.aggregate([
        {
          $group: {
            _id: "$language",
          },
        },
        {
          $project: {
            _id: 0,
            language: "$_id",
          },
        },
      ]),
    ]);

    const priceData = priceStats[0];
    const ratingData = ratingStats[0];

    res.json({
      authors,
      publishers,
      categories,
      price: { priceMin: priceData.priceMin, priceMax: priceData.priceMax },
      rating: {
        ratingMin: ratingData.ratingMin,
        ratingMax: ratingData.ratingMax,
      },
      languages,
    });
  } catch (error) {
    console.error("Error fetching filter data:", error);
    res
      .status(500)
      .json({ message: "Server error while retrieving filter data" });
  }
};

module.exports = {
  getAll,
  getBooksByType,
  getBestsellers,
  getNewBooks,
  getPromotions,
  getUniqueAuthors,
  getUniquePublishers,
  getFilterData,
  filtersBooks,
  filterBooks,
  getBooksByIds,
  getBookById,
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
  getUniqueAuthors: ctrlWrapper(getUniqueAuthors),
  getUniquePublishers: ctrlWrapper(getUniquePublishers),
  getFilterData: ctrlWrapper(getFilterData),
  filterBooks: ctrlWrapper(filterBooks),
};
