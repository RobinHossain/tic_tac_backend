
// Controller
const GameController = require('./controllers/game');

const express = require('express');

/**
 * Init Router
 * @param app
 */
module.exports = function (app) {

  // Initializing route groups
  const apiRoutes = express.Router();


    // Get Existing Tic Tac Data
    apiRoutes.get('/get/:browser_id', GameController.get);

    // Save Game Data for Each State
    apiRoutes.post('/save', GameController.save);

  // Set url for API group routes
  app.use('/api', apiRoutes);

};
