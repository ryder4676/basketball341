// This code sets up different paths for our app and tells it what to do when someone visits them. 
// It's like a map for our app's routes.

//Import necessary modules
const router = require("express").Router();
// Use the "/teams" route defined in the "teams" module
router.use("/teams", require("./teams"));
router.use("/players", require("./players"));

// Use the "/swagger" route defined in the "swagger" module
router.use("/", require("./swagger"));

/**
 * Swagger Route:
 * - This route is used for Swagger documentation.
 * - Swagger is a tool that helps design, build, document, and consume RESTful web services.
 * - It provides a user-friendly interface for exploring and testing your API.
 * - The Swagger module is responsible for handling requests related to Swagger documentation.
 */

module.exports = router;