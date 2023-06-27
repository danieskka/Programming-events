const express = require('express');
const eventsApiRouter = express.Router();
const eventsApiController = require('../controllers/eventsApiController');

// Rutas /user
eventsApiRouter.put('/user', eventsApiController.editProfile);
eventsApiRouter.delete('/user', eventsApiController.deleteProfile);
eventsApiRouter.get('/user', eventsApiController.getAllUsers);

// Ruta /search
eventsApiRouter.get('/search', eventsApiController.searchAll);

// Rutas /ads
eventsApiRouter.post('/ads', eventsApiController.createEvent);
eventsApiRouter.get('/ads', eventsApiController.getEvents);
eventsApiRouter.put('/ads', eventsApiController.editEvent);
eventsApiRouter.delete('/ads', eventsApiController.deleteEvent);

// Rutas /favorites
eventsApiRouter.get('/favorites', eventsApiController.getFavorites);
eventsApiRouter.post('/favorites', eventsApiController.addFavorite);
eventsApiRouter.delete('/favorites', eventsApiController.deleteFavorite);

// Rutas password
eventsApiRouter.get('/recoverpassword', eventsApiController.recoverPass);
eventsApiRouter.get('/restorepassword', eventsApiController.restorePass);



module.exports = eventsApiRouter