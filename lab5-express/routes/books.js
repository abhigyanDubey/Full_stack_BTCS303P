const express = require("express");
const router = express.Router();

const books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// GET all books
router.get("/", (req, res) => {
  res.json(books);
});

// GET single book by id
router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);
  if (!book) {
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  res.json(book);
});

module.exports = router;
