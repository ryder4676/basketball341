const mongoose = require('mongoose');

// Import the Player model (create a models/players.js file)
const Player = require('../models/players');

// Define the 'getAll' function, which fetches all teams from the 'players' collection
const getAll = async (req, res) => {
  try {
    const teams = await Player.find();
    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Error fetching teams' });
  }
};

// Define the 'getSingle' function, which fetches a single player by its ID
const getSingle = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);
    res.status(200).json(player);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Error fetching team' });
  }
};

const createPlayer = async (req, res) => {
  try {
    const player = {
        name: req.body.name,
        position: req.body.position,
        currentTeam:req.body.currentTeam,
        jerseyNumber: req.body.jerseyNumber,
        nationality: req.body.nationality,
        height: {
          feet: req.body.height.feet,
          inches: req.body.height.inches,
        },
        weight: req.body.weight,
        birthdate: req.body.birthdate,
        email: req.body.email
      };

    const newPlayer = await Player.create(player);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Error creating player' });
  }
};

const updatePlayer = async (req, res) => {
  try {
    
    const playerId = req.params.id;
    const player = {
      name: req.body.name,
      position: req.body.position,
      currentTeam:req.body.currentTeam,
      jerseyNumber: req.body.jerseyNumber,
      nationality: req.body.nationality,
      height: {
        feet: req.body.height.feet,
        inches: req.body.height.inches,
      },
      weight: req.body.weight,
      birthdate: req.body.birthdate,
      email: req.body.email
    };

    const updatedPlayer = await Player.findByIdAndUpdate(playerId, player, { new: true });
    res.status(200).json(updatedPlayer);
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ error: 'Error updating player' });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const result = await Player.findByIdAndDelete(playerId);

    if (result) {
      // No response body with a 204 status
      res.status(204).json({ message: 'Successfully deleted player' }).end();
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    console.error('Error deleting player: Use an appropriate player Id', error);
    res.status(500).json({ error: 'Error deleting player: Use an appropriate player Id' });
  }
};



// Export the functions to be used in your routes
module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
