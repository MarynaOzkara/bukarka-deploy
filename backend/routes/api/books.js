const express = require("express");

const booksController = require("../../controllers/books");

const router = express.Router();

router.get("/", booksController.getAll);
router.get("/type", booksController.getBooksByType);
router.get("/bestsellers", booksController.getBestsellers);
router.get("/new", booksController.getNewBooks);
router.get("/promotions", booksController.getPromotions);
router.get("/authors", booksController.getUniqueAuthors);
router.get("/publishers", booksController.getUniquePublishers);
router.get("/filterdata", booksController.getFilterData);
router.get("/filter", booksController.filterBooks);
router.get("/filters", booksController.filtersBooks);
router.get("/ids", booksController.getBooksByIds);
router.get("/:id", booksController.getBookById);

module.exports = router;
