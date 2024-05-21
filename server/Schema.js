const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    // unique: true
  },
  lastName: {
    type: String,
    required: true,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
}, { timestamps: true });

const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  genre: [String],
  description: String,
  cover_image: String,
  price: Number
});

const WishBookSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true }
});

// Define the schema for the wishlist
const WishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  books: [WishBookSchema]
});

const CartItemSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true },
  bookQuantity: { type: Number, required: true },
});

const CartItemListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  books: [CartItemSchema]
});

//hashing the password before save
userSchema.pre('save', async function (next) {
  let user = this;

  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// userSchema.methods.comparePassword = async function (password) {
  // return bcrypt.compare(password, this.password);
// }
userSchema.methods.comparePassword = async function (password) {
  if (typeof password !== 'string') {
    return false;
  }
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model("USER", userSchema);
const Book = mongoose.model("BOOK", bookSchema);
const Wishlist = mongoose.model('Wishlist', WishlistSchema);
const CartItemList = mongoose.model('cartlist', CartItemListSchema);

module.exports = { User, Book, Wishlist, CartItemList };
