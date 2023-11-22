const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 30 },
  position: { type: String, required: true, maxLength: 25 },
  currentTeam:  { type: String, required: true, maxLength: 25 },
  nationality: { type: String, required: true, maxLength: 25 },
  jerseyNumber: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        // Your custom validation logic for jerseyNumber
        return value >= 0 && Number.isInteger(value); // Only allow non-negative integers
      },
      message: 'Invalid jersey number',
    },
  },
  height: {
        feet: { type: Number, required: true, min: 4 },
        inches: { type: Number, required: true, min: 0, max: 11 },
     },
  weight: { type: Number, required: true, min: 100 },
  birthdate: {
    type: Date,
    validate: {
      validator: function (value) {
        // You can add additional validation for a valid date here
        return !isNaN(Date.parse(value));
      },
      message: 'Invalid birthdate format. Use MM/DD/YYYY',
    },
  },
  
  email: { type: String, required: true, maxLength: 30, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
});

const team = mongoose.model('players', playerSchema);

module.exports = team;