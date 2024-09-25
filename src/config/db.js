const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to the BBDD 😜");
  } catch (error) {
    console.log("Error connecting to the BBDD 😢");
  }
};

module.exports = { connectDB };
