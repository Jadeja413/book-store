const express = require('express');
const authenticate = require('../controller/authenticate');
const { Book, User, Order, OrderItem } = require("../Schema");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();


router.get('/', authenticate, async (req, res) => {

  try {
    const books = await Book.find();
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
    console.log("item res", item)
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
