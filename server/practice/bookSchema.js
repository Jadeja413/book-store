const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publication_year: Number,
  genre: [String],
  description: String,
  cover_image: String,
});

const Book = mongoose.model('Data', bookSchema);

module.exports = Book;
