//AUTHMIDDLEWARE
const express = require('express');
const jwt = require("jsonwebtoken");
const users = require("../models/queries");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

module.exports = {
    signUpUser
}