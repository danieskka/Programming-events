const express = require('express');
const eventsApiRouter = express.Router();
const eventsApiController = require('../controllers/eventsApiController');

eventsApiRouter.post('/user', eventsApiController.registerProfile);
eventsApiRouter.put('/user', eventsApiController.editProfile);
eventsApiRouter.delete('/user', eventsApiController.deleteProfile);

eventsApiRouter.post('/login', eventsApiController.userLogin);
eventsApiRouter.post('/logout', eventsApiController.userLogout);

eventsApiRouter.get('/search', eventsApiController.getEvents);

eventsApiRouter.post('/ads', eventsApiController.createEvent);
eventsApiRouter.put('/ads', eventsApiController.editEvent);
eventsApiRouter.delete('/ads', eventsApiController.deleteEvent);

eventsApiRouter.post('/favorites', eventsApiController.addFavorite);
eventsApiRouter.delete('/favorites', eventsApiController.deleteFavorite);

eventsApiRouter.get('/recoverpassword', eventsApiController.recoverPass);
eventsApiRouter.get('/restorepassword', eventsApiController.restorePass);

module.exports = eventsApiRouter