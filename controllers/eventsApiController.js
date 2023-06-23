
const user = require('../models/queries'); // Importar el modelo de la BBDD
const Brite = require('../models/eventBrite');

const Event = require('../models/event')

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


const getEvents = async (req, res) => {

    const event = await Event
        .find()
        .populate('title price info image -_id')
        .select('title price info image -_id');

    res.status(200).json(event)
}

const createEvent = async (req, res) => {

    const { title, price, info, image, id } = req.body

    const event = new Event ({
        id,
        title,
        price,
        info,
        image
    });

    const result = await event.save();
    res.status(201).json({
        message: `Evento creado`,
        event: req.body
    })

}

const editEvent = async (req, res) => {
    const {  id, title, price, info, image, new_title} = req.body;

    const event = await Event
    .findOneAndUpdate({title: title}, {title: new_title,  id, title, price, info, image}, {returnOriginal: false})
    .select('-_id -__v')

    res.status(200).json({
        message: `Evento actualizado`,
        updated_event: event
    })
}


const addFavorite = async (req, res) => {

    const newFav = req.body; // {title,date,location,price,image,info}
    const response = await user.createFav(newFav);
    res.status(201).json({
        "message": `Creado: ${newFav.title}`
    });
}
const deleteEvent = async (req, res) => {

    const { title } = req.body

    const event = await Event
    .findOneAndDelete({title: title})
    .select('-_id -__v')

    res.status(200).json({
        message: `Evento Borrado`,
        deleted_event: event
    })
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

    restorePass,
    searchMongo,
    getEvents

}