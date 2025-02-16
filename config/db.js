require("dotenv").config();
const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the database");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDb;
