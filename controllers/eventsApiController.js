const scraper = require('../utils/scraper')

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

const getScrapEvents = async (req, res) => {
    try {
        const search = req.query.search;
        const data = await scraper.scrap("https://www.eventbrite.es/d/spain--madrid/development/")

        const filteredData = data.filter(result => result.info.toLowerCase().includes(search.toLowerCase()))

        res.render('home', { searchData: filteredData});
    } catch (error) {
        console.error(error);
        res.status(400).json({error: 'Ups algo fue mal, intentalo de nuevo'})
    }
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

module.exports = {
    registerProfile,
    editProfile,
    deleteProfile,
    userLogin,
    userLogout,
    getScrapEvents,
    createEvent,
    editEvent,
    deleteEvent,
    addFavorite,
    deleteFavorite,
    recoverPass,
    restorePass
}