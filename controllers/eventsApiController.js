const user = require('../models/queries'); // Importar el modelo de la BBDD


const registerProfile = async (req, res) => {
    const newUser = req.body; // {name,email,password}
    const response = await user.createUser(newUser);
    res.status(201).json({
        "message": `Creado: ${newUser.name}`
    });
}
const getAllUsers = async (req, res) => {
    let users;
    if (req.query.email) {
        users = await users.getUsersByEmail(req.query.email);
    }
    else {
        users = await users.getUsers();
    }
    res.status(200).json(users); 
}
const editProfile = async (req, res) => {
   
    const dataUser = req.body; // {name,email,password ,new_email}
    const response = await user.updateUser(dataUser);
    res.status(202).json({
        "message": `Actualizado: ${dataUser.email}`
    });
}



const deleteProfile = async (req, res) => {
    
    const dataUser = req.body; // {email}
    const response = await user.deleteUser(dataUser);
    res.status(200).json({
        "message": `Borrado ${dataUser.email}`
    });
}

const userLogin = (req, res) => {
    res.status(200).send("Has mandado un POST de logi2n!");
}

const userLogout = (req, res) => {
    res.status(200).send("Has mandado un POST de salir!");
}

const getEvents = (req, res) => {
    res.status(200).send("Has mandado un GET de resultados de busqueda!");
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

const addFavorite = async (req, res) => {

    const newFav = req.body; // {title,date,location,price,image,info}
    const response = await user.createFav(newFav);
    res.status(201).json({
        "message": `Creado: ${newFav.title}`
    });
}

const deleteFavorite = async (req, res) => {
    const dataFav = req.body; // {title}
    const response = await user.deleteFav(dataFav);
    res.status(200).json({
        "message": `Borrado ${dataFav.title}`
    });
}
const editFavorite = async (req, res) => {
   
    const dataFav = req.body; // {title,date,location,price,image,info, new_title}
    const response = await user.updateFav(dataFav);
    res.status(202).json({
        "message": `Actualizado: ${dataFav.title}`
    });
}

const recoverPass = (req, res) => {
    res.status(200).send("Has mandado un GET de recuperar contraseña!");
}

const restorePass = (req, res) => {
    res.status(200).send("Has mandado un GET de cambiar contraseña!");
}

module.exports = {
        
    registerProfile,
    getAllUsers,
    editProfile,
    deleteProfile,
    userLogin,
    userLogout,
    getEvents,
    createEvent,
    editEvent,
    deleteEvent,
    addFavorite,
    deleteFavorite,
    editFavorite,
    recoverPass,
    restorePass
    
}