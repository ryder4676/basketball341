// This code sets up our app, picks a port for the server, connects different routes, 
// and gets the database ready to use.

// Import necessary modules
const express = require("express");
const {connectToDatabase} = require("./database/database")
const BodyParser = require("body-parser");

// Create an instance of the express application
const app = express();

// Define  the port number, using process.env.PORT if available or 8080 as a default
const port = process.env.PORT || 8080;

// Use 'body-parser' middleware to parse URL-encoded request bodies with extended options.
// Additionally, use the 'body-parser' module to handle JSON request bodies.
app.use(BodyParser.urlencoded({ extended: true }), BodyParser.json());

// USe the routes defined in "./routes for the root path
app.use("/", require("./routes"));

// Connect to the MongoDB database using Mongoose
connectToDatabase();


app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
