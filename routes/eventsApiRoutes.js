const express = require('express');
const eventsApiRouter = express.Router();
const eventsApiController = require('../controllers/eventsApiController');

eventsApiRouter.post('/', eventsApiController.registerProfile);
eventsApiRouter.put('/', eventsApiController.editProfile);
eventsApiRouter.delete('/', eventsApiController.deleteProfile);
eventsApiRouter.post('/', eventsApiController.userLogin);
eventsApiRouter.post('/', eventsApiController.userLogout);
eventsApiRouter.get('/', eventsApiController.getEvents);
eventsApiRouter.post('/', eventsApiController.createEvent);
eventsApiRouter.put('/', eventsApiController.editEvent);
eventsApiRouter.delete('/', eventsApiController.deleteEvent);
eventsApiRouter.post('/', eventsApiController.addFavorite);
eventsApiRouter.delete('/', eventsApiController.deleteFavorite);
eventsApiRouter.get('/', eventsApiController.recoverPass);
eventsApiRouter.get('/', eventsApiController.restorePass);

module.exports = eventsApiRouter