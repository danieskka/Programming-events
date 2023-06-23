const Brite = require('../models/eventBrite');

const registerProfile = (req, res) => {
    res.status(200).send("Has mandado un POST de registro!");
}

const editProfile = (req, res) => {
    res.status(202).send("Has mandado un PUT de editar perfil usuario y admin!");
}

const deleteProfile = (req, res) => {
    res.status(202).send("Has mandado un DELETE para eliminar un user!");
}

const userLogin = (req, res) => {
    res.status(200).send("Has mandado un POST de login!");
}

const userLogout = (req, res) => {
    res.status(200).send("Has mandado un POST de salir!");
}

const createEvent = (req, res) => {
    res.status(200).send("Has mandado un POST de crear un evento!");
}

const editEvent = (req, res) => {
    res.status(202).send("Has mandado un PUT de editar eventos!");
}

const deleteEvent = (req, res) => {
    res.status(202).send("Has mandado un DELETE de eventos!");
}

const addFavorite = (req, res) => {
    res.status(200).send("Has mandado un POST de guardar como favorito!");
}

const deleteFavorite = (req, res) => {
    res.status(202).send("Has mandado un DELETE de favoritos!");
}

const recoverPass = (req, res) => {
    res.render("recoverpassword");
}

const restorePass = (req, res) => {
    res.render("restorepassword");
}

// Controller BBDD MongoDB
const searchMongo = async (req,res) => {
    try {
        let events = await Brite.find({});
        console.log(events);
        res.status(200).json(events);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({
            msj: 'Ups algo fue mal, ha ocurrido un error'
        });
        
    }
}

module.exports = {
    registerProfile,
    editProfile,
    deleteProfile,
    userLogin,
    userLogout,
    createEvent,
    editEvent,
    deleteEvent,
    addFavorite,
    deleteFavorite,
    recoverPass,
    restorePass,
    searchMongo
}