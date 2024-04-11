const express = require("express");
const mongoose = require('mongoose');
const Book = require('./DatabaseSchema');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mongoURL = 'mongodb+srv://kuldeepsinh:Atharva123@example.f6y5ymk.mongodb.net/';

mongoose.connect(mongoURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.error.bind(console, 'MongoDB connection error:');
});
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // try {
  //   // Find all documents
  //   const docs = await Book.find();

  //   for (const doc of docs) {
  //     // Generate a random number between 100 and 200
  //     const randomPrice = Math.floor(Math.random() * 10) * 10 + 100;

  //     // Update the document with the new random price
  //     await Book.findByIdAndUpdate(
  //       doc._id,
  //       { $set: { price: randomPrice } },
  //       { new: true }
  //     );
  //   }

  //   console.log('Price update complete');
  // } catch (error) {
  //   console.error('Error:', error);
  // } finally {
  //   // Close the MongoDB connection
  //   mongoose.connection.close();
  // }
});

app.get('/get', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/update', async (req, res) => {

});
// })

app.post('/post', (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// })
