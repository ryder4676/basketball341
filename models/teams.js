// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the Team model
const teamSchema = new mongoose.Schema({
  nickName: { type: String, required: true, maxLength: 30 },
  cityName: { type: String, required: true, maxLength: 30 },
  homeArena: { type: String, required: true, maxLength: 30 },
  coach: {
    type: String,
    required: true,
    maxLength: 30,
    // Custom validation for coach name using a regular expression
    validate: {
      validator: (value) => /^[a-zA-Z]+$/.test(value),
      message: 'Coach name must only contain letters.',
    },
  },
  founded: { type: Number },
  championships: { type: Number },
  conference: { type: String, required: true, maxLength: 30 },
  division: { type: String, required: true, maxLength: 30 },
});

// Create the 'teams' model based on the defined schema
const Team = mongoose.model('teams', teamSchema);

// Export the Team model to be used in other files
module.exports = Team;
