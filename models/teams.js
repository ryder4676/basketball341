// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the Team model
const teamSchema = new mongoose.Schema({
  nickName: { type: String, required: true, maxLength: 25 },
  cityName: { type: String, required: true, maxLength: 25 },
  homeArena: { type: String, required: true, maxLength: 30 },
  coach: {
    type: String,
    required: true,
    maxLength: 30,
    validate: {
      validator: (value) => isNaN(value),
      message: 'Coach name must not be a number.',
    },
  },
  founded: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => /^\d{4}$/.test(value.toString()), // Check if it's a 4-digit number
      message: 'Founded year must be a 4-digit number.',
    },
  },
  championships:{type:Number, required: true},
  conference: { type: String, required: true, maxLength: 15 },
  division: { type: String, required: true, maxLength: 15 },
});

// Create the 'teams' model based on the defined schema
const Team = mongoose.model('teams', teamSchema);

// Export the Team model to be used in other files
module.exports = Team;
