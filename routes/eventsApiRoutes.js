const express = require('express');
const eventsApiRouter = express.Router();
const eventsApiController = require('../controllers/eventsApiController');


eventsApiRouter.get('/user', eventsApiController.getAllUsers);
eventsApiRouter.post('/user', eventsApiController.registerProfile);
eventsApiRouter.put('/user', eventsApiController.editProfile);
eventsApiRouter.delete('/user', eventsApiController.deleteProfile);
eventsApiRouter.post('/', eventsApiController.userLogin);
eventsApiRouter.post('/', eventsApiController.userLogout);
eventsApiRouter.get('/', eventsApiController.getEvents);
eventsApiRouter.post('/', eventsApiController.createEvent);
eventsApiRouter.put('/', eventsApiController.editEvent);
eventsApiRouter.delete('/', eventsApiController.deleteEvent);
eventsApiRouter.post('/favorites', eventsApiController.addFavorite);
eventsApiRouter.delete('/favorites', eventsApiController.deleteFavorite);
eventsApiRouter.put('/favorites', eventsApiController.editFavorite);
eventsApiRouter.get('/', eventsApiController.recoverPass);
eventsApiRouter.get('/', eventsApiController.restorePass);

module.exports = eventsApiRouter