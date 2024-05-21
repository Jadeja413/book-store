const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Wishlist, CartItemList} = require('../Schema');

const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  console.log('signup')

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) return res.status(404).json({ message: "User Already Exits" });
    else {
      // const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password, firstName, lastName});
      user.save();

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1min',
      });

      res.json({token, message: 'Registration successful', data: user });
    }

  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  const {email, password} = req.body;
  console.log('login')

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) return res.status(404).json({ message: 'User Not Found' });
    
    const passMacth = checkUser.comparePassword({password});

    if(!passMacth) return res.status(404).json({message: 'password is Incorrect'});

    const token = jwt.sign({ userId: checkUser._id }, process.env.SECRET_KEY, {
      expiresIn: '1min'
    });

    const userId = checkUser._id;
    const wishlist = await Wishlist.findOne({ userId });
    const wishlistCount = wishlist?.books.length;

    const cartlist = await CartItemList.findOne({ userId });
    const cartlistCount = cartlist?.books.length;

    const userData = checkUser.toObject();

    res.json({ token, checkUser: {...userData, wishlistCount, cartlistCount} , message: 'Login successful' });

    // res.json({ token, checkUser, wishlistCount , message: 'Login successful' });
  } catch (error) {
    next(error)
  }
}

module.exports = {login, signup}
