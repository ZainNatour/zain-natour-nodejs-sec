const express = require("express");
const router = express.Router();

const books = require("./books.json"); // Import your books data

const userController = require("./controller");

// Define routes and map them to controller functions
router.get("/books", userController.getBooks);
router.get("/books/create_book", (req, res) => {
  res.render("createbook");
});
router.get("/books/:id", userController.getBookById);
router.post("/books", userController.createBook);

module.exports = router;
