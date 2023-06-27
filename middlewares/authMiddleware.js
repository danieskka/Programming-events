//AUTHMIDDLEWARE
const express = require('express');
const jwt = require("jsonwebtoken");
const users = require("../models/queries");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// SignUp
const signUpUser = async(req, res, next) => {
    let data;
    try {
        const {email, password, name, admin, login} = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = {name, email, "password":hashPassword, admin, login}
        data = await users.createUser(newUser);
        await users.updateUser(email);

        req.user = {email};
        next();

    } catch (error) {
        console.log('Error:', error);
    }
};

// Login
const checkEmailLogIn = async(req, res, next) => {
    let {email, password} = req.body;
    try {
        let data = await users.getUsersByEmail(email);
        if(!data){
            console.log("This email do not have an account");
            res.status(401).json({"success": false, "msj":"This email do not have an account"});
        } else {
            const match = await bcrypt.compare(password, data[0].password);
            if(match){
                await users.logInUserTrue(email);
                req.user = {email};
                console.log("++++++>>>", data);
                next();
            } else {
                res.status(400).json({ msg: 'Incorrect user or password'});
            }
        }

    } catch (error) {
        console.log('Error:', error);
    }
}

// Logout
const authCheck = (req, res, next) => {
    const token = req.cookies["access-token"];
    if(token){
        jwt.verify(token, jwtSecret, async (err, decoded) => {
            //console.log("decoded -----> ", decoded);
            let {email} = decoded;
            let data = await users.getUsersByEmail(email);
            console.log(data)
            //console.log("data: ",data)
            if(data[0].login == true) {
                req.decoded = decoded;
                req.decoded.data = data[0];
                next();
            } else {
                console.log("Invalid token");
                req.logout(function(err) {
                    if (err) { return next(err); }
                    req.session.destroy();
                    res.clearCookie("access-token").redirect('/login');
                });
            }
        })
    } else {
        console.log("Token not provided");
        res.redirect("/login");
    }
}

module.exports = {
    signUpUser,
    checkEmailLogIn,
    authCheck
}