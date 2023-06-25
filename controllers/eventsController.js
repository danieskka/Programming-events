const controller = require('./eventAdminController')
const fetch = require('node-fetch');

const getHome = (req, res) => {
    res.render("home");
}

const signUp = (req, res) => {
    res.render("signup");
}

const login = (req, res) => {
    res.render("login");
}

const favorites = (req, res) => {
    res.render("favorites");
}

const profile = (req, res) => {
    res.render("profile");
}

const users = (req, res) => {
    res.render("users")
}

const dashboard = (req, res) => {
    try{
        let dash = await fetch('/api/dashboard');
        let data = dash.createEvent
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    getHome,
    signUp,
    login,
    favorites,
    profile,
    users,
    dashboard
}