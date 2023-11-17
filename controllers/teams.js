// Import the mongoose library
const mongoose = require('mongoose');

// Import the Teams model (create a models/teams.js file)
const Team = require('../models/teams');

// Define the 'getAll' function, which fetches all teams from the 'teams' collection
const getAll = async (req, res) => {
  try {
    // Retrieve all teams from the database
    const teams = await Team.find();
    // Respond with a 200 OK status and the list of teams in the response body
    res.status(200).json(teams);
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Error fetching teams' });
  }
};

// Define the 'getSingle' function, which fetches a single team by its ID
const getSingle = async (req, res) => {
  try {
    // Extract the team ID from the request parameters
    const teamId = req.params.id;
    // Find the team by ID in the database
    const team = await Team.findById(teamId);
    // Respond with a 200 OK status and the team in the response body
    res.status(200).json(team);
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Error fetching team' });
  }
};

// Define the 'createTeam' function, which creates a new team in the database
const createTeam = async (req, res) => {
  try {
    // Extract team details from the request body
    const team = {
      nickName: req.body.nickName,
      cityName: req.body.cityName,
      coach: req.body.coach,
      homeArena: req.body.homeArena,
      founded: req.body.founded,
      championships: req.body.championships,
      conference: req.body.conference,
      division: req.body.division
    };

    // Create a new team in the database
    const newTeam = await Team.create(team);
    // Respond with a 201 Created status and the new team in the response body
    res.status(204).json(newTeam);
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Error creating team' });
  }
};

// Define the 'updateTeam' function, which updates a team in the database by ID
const updateTeam = async (req, res) => {
  try {
    // Extract the team ID from the request parameters
    const teamId = req.params.id;
    // Extract updated team details from the request body
    const team = {
      nickName: req.body.nickName,
      cityName: req.body.cityName,
      coach: req.body.coach,
      homeArena: req.body.homeArena,
      founded: req.body.founded,
      championships: req.body.championships,
      conference: req.body.conference,
      division: req.body.division
    };

    // Find and update the team in the database by ID
    const updatedTeam = await Team.findByIdAndUpdate(teamId, team, { new: true });

    // Check if the team is found
    if (updatedTeam) {
      // Respond with a 204 OK status and the updated team in the response body
      res.status(204).json(updatedTeam);
    } else {
      // If the team is not found, respond with a 404 Not Found status
      res.status(404).json({ error: 'Team not Found' });
    }
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
    console.error('Error updating team: Make sure fields are filled in correctly', error);
    res.status(500).json({ error: 'Error updating team: Make sure fields are filled in correctly' });
  }
};


// Define the 'deleteTeam' function, which deletes a team from the database by ID
const deleteTeam = async (req, res) => {
  try {
    // Extract the team ID from the request parameters
    const teamId = req.params.id;
    // Find and delete the team from the database by ID
    const result = await Team.findByIdAndDelete(teamId);

    if (result) {
      // Respond with a 204 No Content status and a custom success message in the response body
      res.status(204).json({ message: 'Successfully deleted team' });
    } else {
      // If the team is not found, respond with a 404 Not Found status
      res.status(404).json({ error: 'Team not Found' });
    }
  } catch (error) {
    // Handle errors by logging them and responding with a 500 Internal Server Error status
    console.error('Error deleting team: please enter avlaidly formatted team id', error);
    res.status(500).json({ error: 'Error deleting team: please enter avlaidly formatted team id' });
  }
};

// Export the functions to be used in your routes
module.exports = {
  getAll,
  getSingle,
  createTeam,
  updateTeam,
  deleteTeam,
};

