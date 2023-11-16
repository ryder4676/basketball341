const mongoose = require('mongoose');

// Import the Teams model (create a models/teams.js file)
const Team = require('../models/teams');

// Define the 'getAll' function, which fetches all teams from the 'teams' collection
const getAll = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Error fetching teams' });
  }
};

// Define the 'getSingle' function, which fetches a single team by its ID
const getSingle = async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findById(teamId);
    res.status(200).json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Error fetching team' });
  }
};

const createTeam = async (req, res) => {
  try {
    const team = {
      nickName: req.body.nickName,
      cityName: req.body.cityName,
      homeArena: req.body.homeArena,
      coach: req.body.coach,
      founded: req.body.founded,
      championships: req.body.championships,
      conference: req.body.conference,
      division: req.body.division
    };

    const newTeam = await Team.create(team);
    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Error creating team' });
  }
};

const updateTeam = async (req, res) => {
  try {
    
    const teamId = req.params.id;
    const team = {
      nickName: req.body.nickName,
      cityName: req.body.cityName,
      homeArena: req.body.homeArena,
      coach: req.body.coach,
      founded: req.body.founded,
      championships: req.body.championships,
      conference: req.body.conference,
      division: req.body.division
    };

    const updatedTeam = await Team.findByIdAndUpdate(teamId, team, { new: true });
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Error updating team' });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const result = await Team.findByIdAndDelete(teamId);

    if (result) {
      res.status(204).json({ message: 'Successfully deleted team' });
    } else {
      res.status(404).json({ error: 'Successfully deleted team' });
    }
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Error deleting team' });
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
