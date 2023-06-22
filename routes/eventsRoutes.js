const express = require('express');
const eventsRouter = express.Router();
const eventsController = require('../controllers/eventsController');


eventsRouter.get('/', eventsController.getHome);
eventsRouter.get('/', eventsController.signUp);
eventsRouter.get('/', eventsController.login);
eventsRouter.get('/', eventsController.favorites);
eventsRouter.get('/', eventsController.profile);
eventsRouter.get('/', eventsController.users);
eventsRouter.get('/', eventsController.dashboard);


module.exports = eventsRouter