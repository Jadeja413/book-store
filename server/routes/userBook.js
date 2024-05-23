const express = require('express');
const authenticate = require('../controller/authenticate');
const { Book } = require("../Schema");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();


router.get('/', authenticate, async (req, res) => {
  const { title, price } = req.query;
  try {
    let books;
    if (title) {
      const titileRegex = new RegExp(title, 'i');
      books = await Book.find({ title: titileRegex})
    } else {
     books = await Book.find();
  }
  res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:bookId', authenticate,  async (req, res) => {
  try {
    const books = await Book.find();
    const bookId = req.params.bookId;

    const item = books.find(book => (book.id === parseInt(bookId)));
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
