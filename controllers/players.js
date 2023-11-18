// Import the mongoose library
const mongoose = require('mongoose');

// Import the Player model (create a models/players.js file)
const Player = require('../models/players');

// Define the 'getAll' function, which fetches all players from the 'players' collection
const getAll = async (req, res) => {
  try {
    // Retrieve all players from the database
    const players = await Player.find();
    // Respond with a 200 OK status and the list of players in the response body
    res.status(200).json(players);
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Error fetching players' });
  }
};

// Define the 'getSingle' function, which fetches a single player by its ID
const getSingle = async (req, res) => {
  try {
    // Extract the player ID from the request parameters
    const playerId = req.params.id;
    // Find the player by ID in the database
    const player = await Player.findById(playerId);
    // Respond with a 200 OK status and the player in the response body
    res.status(200).json(player);
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Error fetching player' });
  }
};

// Define the 'createPlayer' function, which creates a new player in the database
const createPlayer = async (req, res) => {
  try {
    // Extract player details from the request body
    const player = {
      name: req.body.name,
      position: req.body.position,
      currentTeam: req.body.currentTeam,
      jerseyNumber: req.body.jerseyNumber,
      nationality: req.body.nationality,
      height: {
        feet: req.body.height.feet,
        inches: req.body.height.inches,
      },
      weight: req.body.weight,
      birthdate: req.body.birthdate,
      email: req.body.email,
    };

    // Create a new player in the database
    const newPlayer = await Player.create(player);
    // Respond with a 204 Created status and the new player in the response body
    res.status(204).json(newPlayer);
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
    console.error('Error creating player: Make sure you have filled all the required fields', error);
    res.status(500).json({ error: 'Error creating player: Make sure you have filled all the required fields' });
  }
};

// Define the 'updatePlayer' function, which updates a player in the database by ID
const updatePlayer = async (req, res) => {
  try {
    // Extract the player ID from the request parameters
    const playerId = req.params.id;
    // Extract updated player details from the request body
    const player = {
      name: req.body.name,
      position: req.body.position,
      currentTeam: req.body.currentTeam,
      jerseyNumber: req.body.jerseyNumber,
      nationality: req.body.nationality,
      height: {
        feet: req.body.height.feet,
        inches: req.body.height.inches,
      },
      weight: req.body.weight,
      birthdate: req.body.birthdate,
      email: req.body.email,
    };

    // Find and update the player in the database by ID
    const updatedPlayer = await Player.findByIdAndUpdate(playerId, player, { new: true, runValidators: true });
    // Respond with a 200 OK status and the updated player in the response body
    res.status(204).json(updatedPlayer);
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
    console.error('Error updating player: Make sure you have all fields required', error);
    res.status(500).json({ error: 'Error updating player: Make sure you have all fields required' });
  }
};

// Define the 'deletePlayer' function, which deletes a player from the database by ID
const deletePlayer = async (req, res) => {
  try {
    // Extract the player ID from the request parameters
    const playerId = req.params.id;
    // Find and delete the player from the database by ID
    const result = await Player.findByIdAndDelete(playerId);

    if (result) {
      // Respond with a 204 No Content status and a custom success message in the response body
      res.status(204).json({ message: 'Successfully deleted player' }).end();
    } else {
      // If the player is not found, respond with a 404 Not Found status
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
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
