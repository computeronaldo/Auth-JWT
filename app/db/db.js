const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: ".env" });

const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB successfully");
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = connectToDB;
