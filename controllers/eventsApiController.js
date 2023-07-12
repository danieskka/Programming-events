const user = require('../models/queries'); // Importar el modelo de la BBDD
const Brite = require('../models/eventBrite');
const scraper = require ('../utils/scraper.js');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const getAllUsers = async (req, res) => {
  try {
    const token = req.cookies["access-token"]; // Obtén el JWT almacenado en la cookie
    const secretKey = jwtSecret; // Reemplaza esto con tu clave secreta

    // Desencripta el JWT para obtener la información del usuario logueado
    const decodedToken = jwt.verify(token, secretKey);
    const userEmail = decodedToken.email;

    let users;
    if (req.query.email) {
      users = await user.getUsersByEmail(req.query.email);
    } else {
      // Filtra los usuarios por el email del usuario logueado
      users = await user.getUsersByEmail(userEmail);
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

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
  const getFavorites = async (req, res) => {
    let fav;
    
        fav = await user.getFavsByEmail(req.query.email);
    
    res.status(200).json(fav); 
}



const getEvents = async (req, res) => {

    const event = await Brite
        .find()
        .populate('name info description image')
        .select('name info description image');

    res.status(200).json(event)
}

const createEvent = async (req, res) => {

    const { name, info, description, image } = req.body

    // const event = new Brite ({
    //     id,
    //     name,
    //     info,
    //     image,
    //     description
    // });

    const event2 = await Brite.create(req.body)
    res.status(201).json(event2);

    // const result = await event.save();
    // res.status(201).json({
    //     message: `Evento creado`,
    //     event: req.body
    // })

}

const editEvent = async (req, res) => {
    const { name, image, info, description, new_name, new_image, new_info, new_description} = req.body;

    const event = await Brite
    .findOneAndUpdate({name: name}, {name: new_name, image: new_image, info: new_info, description: new_description, name, image, info, description}, {returnOriginal: false})
    .select('-__v')

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

    const { name } = req.body

    const event = await Brite
    .findOneAndDelete({name: name})
    .select(' -__v')

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
            scrapedData: scrapedData
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
    getAllUsers,
    editProfile,
    deleteProfile,
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