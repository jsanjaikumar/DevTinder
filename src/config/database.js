const dotenv = require("dotenv");
dotenv.config(); // Loads variables from .env into process.env


const DB_CONNECTION_SECRET = process.env.DB_CONNECTION_SECRET;

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(DB_CONNECTION_SECRET);
};

module.exports = connectDB;
