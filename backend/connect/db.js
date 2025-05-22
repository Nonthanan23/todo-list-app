// backend/connect/db.js
// Purpose: Connect to MongoDB securely using dotenv environment variables

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // terminate if connection fails
  }
};

module.exports = connectDB;
