// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the Player model
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 30 },
  position: { type: String, required: true, maxLength: 30 },
  currentTeam: { type: String, required: true, maxLength: 30 },
  nationality: { type: String, required: true, maxLength: 30 },
  jerseyNumber: { type: Number, required: true },
  height: {
    feet: { type: Number, required: true, min: 4 },
    inches: { type: Number, required: true, min: 0, max: 11 },
  },
  weight: {
    type: Number,
    required: true,
    min: 100
  },
  
  birthdate: {
    type: Date,
    required: true,
    // Custom validation for birthdate
    validate: {
      validator: function (birthdate) {
        // Your custom validation logic here
        const currentDate = new Date();
        const minDate = new Date('1900-01-01'); // Change as needed
        const maxDate = currentDate;

        return birthdate >= minDate && birthdate <= maxDate;
      },
      message: 'Invalid birthdate',
    },
  },
  email: {
    type: String,
    required: true,
    maxLength: 40,
    // Custom validation for email using a regular expression
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
});

// Create the 'players' model based on the defined schema
const Player = mongoose.model('players', playerSchema);

// Export the Player model to be used in other files
module.exports = Player;
