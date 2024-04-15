const jwt = require('jsonwebtoken');
const {User} = require('../Schema');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // console.log("authenticate", token)
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("authenticate", decodeToken)

    const user = await User.findById(decodeToken.userId);
    // console.log("user", user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    // console.log("authenticate error", error)

    res.status(401).json({ message: error.message });
  }
}

module.exports = authenticate; // Exporting the function directly
