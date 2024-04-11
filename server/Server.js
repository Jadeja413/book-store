const express = require('express');
const cors = require('cors');
const dbConnection = require('./dbConnection');
const { Book, User } = require('./Schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const unAuthRoutes = require('./routes/unAuth');
const userRoutes = require('./routes/userBook');
require('dotenv').config();

const app = express();
// const PORT = 9000;

app.use(cors());
app.use(express.json());

dbConnection();

// app.get('/books', async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/books/:bookId', async (req, res) => {
//   try {
//     const books = await Book.find();
//     const bookId = req.params.bookId;

//     const item = books.find(book => (book.id === parseInt(bookId)));
//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.use('/books', userRoutes);

app.use('/', unAuthRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on portx ${process.env.PORT}`);
});
