// These functions make sure our app connects to the database and can access its data when needed.

// Load the "dotenv" tool to manage environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import Mongoose
const mongoose = require("mongoose");

// Initialize a variable to store the database connection
let database;

const connectToDatabase = async () => {
  try {
    if (database) {
      console.log("Database is already initialized!");
      return database;
    }

    // Connect to the MongoDB database using the provided URI
    await mongoose.connect(process.env.MONGODB_URL, {});

    // Store the database connection
    database = mongoose.connection;
    console.log("Database connected successfully!");

    return database;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

// Export the function to be used in other parts of your application
module.exports = {
  connectToDatabase,
};
