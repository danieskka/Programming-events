const user = require('../models/queries'); // Importar el modelo de la BBDD
const Brite = require('../models/eventBrite');
const Event = require('../models/event');
const scraper = require ('../utils/scraper.js')

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
        users = await user.getUsersByEmail(req.query.email);
    }
    else {
        users = await user.getUsers();
    }
    res.status(200).json(users); 
}
const editProfile = async (req, res) => {
   
    const dataUser = req.body; // {name,email,password ,new_email}
    const response = await user.updateUser(dataUser);
    res.status(202).json({
        "message": `Actualizado: ${response.email}`
    });
}



const deleteProfile = async (req, res) => {
    
    const dataUser = req.body; // {email}
    const response = await user.deleteUser(dataUser);
    res.status(200).json({
        "message": `Borrado ${response.email}`
    });
}
const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await user.loginUser(email, password);

      if (result.length > 0) {
        res.status(200).json({ message: 'Login actualizado' });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (err) {
      console.error('Error', err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }

const userLogout = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await user.logoutUser(email, password);

      if (result.length > 0) {
        res.status(200).json({ message: 'Login actualizado' });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (err) {
      console.error('Error', err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
const getFavorites = async (req, res) => {
    let fav;
    if (req.query.email) {
        fav = await user.getFavsByEmail(req.query.email);
    }
    else {
        fav = await user.getFavs();
    }
    res.status(200).json(fav);
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

    const newFav = req.body; // {name,date,location,image,info, description}
    const response = await user.createFav(newFav);
    res.status(201).json({
        "message": `Creado: ${newFav.name}`
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
    const dataFav = req.body; // {name}
    const response = await user.deleteFav(dataFav);
    res.status(200).json({
        "message": `Borrado ${response.name}`
    });
}
const editFavorite = async (req, res) => {
   
    const dataFav = req.body; // {name,date,location,image,info, description, new_title}
    const response = await user.updateFav(dataFav);
    res.status(202).json({
        "message": `Actualizado: ${response.name}`
    });
}

const recoverPass = (req, res) => {
    res.render("recoverpassword");
}

const restorePass = (req, res) => {
    res.render("restorepassword");
}

// Controller BBDD MongoDB
const searchAll = async (req,res) => {
    try {

        const search = req.query.search;
        const location = req.query.location;

        const url = `https://www.eventbrite.es/d/${location}/${search}/`;

        let events = await Brite.find({ name: { $regex: search, $options: 'i'} });
        console.log(events);

        const scrapedData = await scraper.scrap(url);

        const allData = {
            mongoDB: events,
            scrapedData: scrapedData,
        }

        res.status(200).json(allData);

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
    searchAll,
    getEvents,
    getFavorites

}