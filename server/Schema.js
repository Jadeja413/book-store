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
  // wishList: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'WishList'
  // }
  // token: String,
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

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   subTotal: { type: Number, required: true },
//   total: { type: Number, required: true },
//   status: { type: String, default: 'in_cart' },
// });

// const orderItemSchema = new mongoose.Schema({
//   order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
//   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   quantity: { type: Number, required: true },
//   totalPrice: { type: Number, required: true },
// });

// const wishListSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   books: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Book',
//     required: true
//   }]
// }, { timestamps: true });

const WishBookSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true }
});

// Define the schema for the wishlist
const WishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  books: [WishBookSchema] // Array of books
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
// const Order = mongoose.model('Order', orderSchema);
// const OrderItem = mongoose.model('OrderItem', orderItemSchema);
const Wishlist = mongoose.model('Wishlist', WishlistSchema);


module.exports = { User, Book, Wishlist };
