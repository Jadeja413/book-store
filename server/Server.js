const express = require('express');
const cors = require('cors');
const dbConnection = require('./dbConnection');
// const { Book, User, Wishlist } = require('./Schema');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const unAuthRoutes = require('./routes/unAuth');
const userRoutes = require('./routes/userBook');
const wishlistRoutes = require('./routes/wishList')
require('dotenv').config();

const app = express();
// const PORT = 9000;

app.use(cors());
app.use(express.json());

dbConnection();

app.use('/', unAuthRoutes);

app.use('/books', userRoutes);

app.use('/wishlist', wishlistRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on portx ${process.env.PORT}`);
});
