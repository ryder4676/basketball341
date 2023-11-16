const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {type:String, required: true, maxLength: 30},
  position: {type:String, required: true, maxLength: 30},
  currentTeam: {type:String, required: true, maxLength: 30},
  nationality: {type:String, required: true, maxLength: 30},
  jesreyNumber: {type:Number},
  height: {type:Number},
  weight: {type:Number},
  email: { type: String, required: true, maxLength: 30, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
});

const team = mongoose.model('players', playerSchema);

module.exports = team;