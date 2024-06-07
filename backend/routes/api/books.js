const express = require("express");

const booksController = require("../../controllers/books");

const router = express.Router();

router.get("/", booksController.getAll);
router.get('/type', booksController.getBooksByType)
router.get("/bestsellers", booksController.getBestsellers);
router.get("/new", booksController.getNewBooks);
router.get("/promotions", booksController.getPromotions);
router.get("/filters", booksController.filtersBooks);
router.get("/:id", booksController.getBookById);

module.exports = router;
