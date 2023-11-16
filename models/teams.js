const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  nickName: {type:String, required: true, maxLength: 30},
  cityName: {type:String, required: true, maxLength: 30},
  homeArena: {type:String, required: true, maxLength: 30},
  coach: {type:String, required: true, maxLength: 30},
  founded: {type:Number},
  championships: {type:Number},
  conference: {type:String, required: true, maxLength: 30},
  division: {type:String, required: true, maxLength: 30}
});

const team = mongoose.model('teams', teamSchema);

module.exports = team;
