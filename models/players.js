const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {type:String, required: true, maxLength: 30},
  position: {type:String, required: true, maxLength: 30},
  currentTeam: {type:String, required: true, maxLength: 30},
  nationality: {type:String, required: true, maxLength: 30},
  jerseyNumber: {type:Number},
  height: {
        feet: { type: Number, required: true, min: 4 },
        inches: { type: Number, required: true, min: 0, max: 11 },
     },
  weight: { type: Number, required: true, min: 100 },
  birthdate: {
    type: Date,
    required: true,
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
  email: { type: String, required: true, maxLength: 30, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
});

const team = mongoose.model('players', playerSchema);

module.exports = team;