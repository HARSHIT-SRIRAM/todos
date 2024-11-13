const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Server");
  } catch (error) {
    console.error("Error connecting to MongoDB Server:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
