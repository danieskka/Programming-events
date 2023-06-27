const express = require('express');
const authRouter = express.Router();
const authMiddleware = require ('../middlewares/authMiddleware');
const authController = require ('../controllers/authController');

//AUTH ROUTES
//EMAIL AND PASSWORD - PASSPORT OAUTH 
// Log in
// authRouter.post("/auth/login", authMiddleware.checkEmailLogIn, authController.createAndStoreToken);
// Sign up
authRouter.post("/auth/signup", authMiddleware.signUpUser, authController.createAndStoreToken);

module.exports = authRouter
