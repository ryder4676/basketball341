// This code sets up routes for our app. Each route tells the app what to do when it receives certain requests.
// It guides requests to the right place.

// Import the necessary modules
const router = require("express").Router();
const teamController = require("../controllers/teams");
const { isAuthenticated } = require("../middleware/authenticate");

// Define routes and link them to controller functions
// This route responds to GET requests on the root path and invokes the 'getAll' function from the 'teamController'
router.get("/", teamController.getAll);

// This route responds to GET requests with an 'id' parameter and invokes the 'getSingle' function from the 'teamController'
router.get("/:id", teamController.getSingle);

// This route responds to POST requests to create a new contact
router.post("/", isAuthenticated, teamController.createTeam);

router.put("/:id", isAuthenticated, teamController.updateTeam);

router.delete("/:id", isAuthenticated, teamController.deleteTeam);

// Export the router to be used in other parts of your application
module.exports = router;
