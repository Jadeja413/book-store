const express = require('express');
const authenticate = require('../controller/authenticate');
const { Book } = require("../Schema");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const { title, minPrice, maxPrice } = req.query;
  try {
    let books;
    //   if (title) {
    //     const titileRegex = new RegExp(title, 'i');
    //     books = await Book.find({ title: titileRegex});

    //   } else {
    //     books = await Book.find();
    //     // books = await Book.find({price: { $gte: price}});
    //     // const books = await Book.find({ price: { $gte: price?.[0], $lte: price?.[1] } });
    // }
    const priceData = await Book.find();
    const prices = priceData?.map(item => item.price);
    const min = Math.min(...new Set(prices))
    const max = Math.max(...new Set(prices))

    const titileRegex = new RegExp(title, 'i');

    if (title && minPrice && maxPrice) {
      books = await Book.find({ title: titileRegex, price: { $gte: minPrice , $lte: maxPrice }});
    } else if (title) {
      books = await Book.find({ title: titileRegex });
    } else if (minPrice && maxPrice) {
      books = await Book.find({ price: { $gte: minPrice, $lte: maxPrice } });
    } else {
      books = await Book.find();
    }
    res.json({data: books, price: {min: min, max: max}});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:bookId', authenticate, async (req, res) => {
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
