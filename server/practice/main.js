const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./bookSchema');

const app = express();
const port = 3001;

app.use(cors())
app.use(express.json());

const mongoURI = 'mongodb+srv://kuldeepsinh:Atharva123@example.f6y5ymk.mongodb.net/';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes for your application using the Book model
app.get('/resp', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/resp1', async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
