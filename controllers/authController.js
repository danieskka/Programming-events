//AUTH CONTROLLER
const express = require('express');
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const users = require('../models/queries');
require("dotenv").config();

const createAndStoreToken = (req,res)=>{
    //En el cuerpo de esta función podemos almacenar usuarios en nuestra bbdd con el objeto que nos proporciona req.user (Para ello es necesario hacer la función asíncrona)

    //Estos son los pasos para crear un token si la autenticación es exitosa
    const payload = {
        //save here data
        check: true,
        email: req.user.email
    };

    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "365d"
    });

    //Almacenamos el token en las cookies
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "lax",
    }).redirect('/');
}

// CONTROLLER LOGOUT
// Destroy session and clear cookies
const destroySessionAndClearCookies = (req, res) => {
    // Now we have to change the user state because he is logging out:
    let email = req.decoded.email;
    console.log(email);
    users.logInUserFalse(email);

    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.clearCookie("access-token").redirect('/');
    });
}


module.exports = {
    createAndStoreToken,
    destroySessionAndClearCookies
}