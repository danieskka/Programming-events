const express = require('express');
const eventsApiRouter = express.Router();
const eventsApiController = require('../controllers/eventsApiController');

// Rutas /user
eventsApiRouter.post('/user', eventsApiController.registerProfile);
eventsApiRouter.put('/user', eventsApiController.editProfile);
eventsApiRouter.delete('/user', eventsApiController.deleteProfile);

// Rutas login/out
eventsApiRouter.post('/login', eventsApiController.userLogin);
eventsApiRouter.post('/logout', eventsApiController.userLogout);

// Ruta /search
eventsApiRouter.get('/search', eventsApiController.searchAll);

// Rutas /ads
eventsApiRouter.post('/ads', eventsApiController.createEvent);
eventsApiRouter.put('/ads', eventsApiController.editEvent);
eventsApiRouter.delete('/ads', eventsApiController.deleteEvent);

// Rutas /favorites
eventsApiRouter.post('/favorites', eventsApiController.addFavorite);
eventsApiRouter.delete('/favorites', eventsApiController.deleteFavorite);

// Rutas password
eventsApiRouter.get('/recoverpassword', eventsApiController.recoverPass);
eventsApiRouter.get('/restorepassword', eventsApiController.restorePass);



module.exports = eventsApiRouter