const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {});
    console.log("Connected to MongoDB...");
  } catch(error) {
    console.error.bind(console, 'MongoDB connection error:');
  }
}

module.exports = dbConnection;
