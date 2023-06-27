//AUTH CONTROLLER
const passport = require('passport');
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
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
    }).redirect("/");
}

module.exports = {
    createAndStoreToken
}