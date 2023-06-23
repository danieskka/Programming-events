const Brite = require('../models/eventBrite');

const Event = require('../models/event')

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