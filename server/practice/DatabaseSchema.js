const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({
    title: String,
    author: String,
    publication_year: Number,
    genre: [String],
    description: String,
    cover_image: String,
    price: Number,
});

const Book = mongoose.model("Book", DatabaseSchema);

module.exports = Book;


