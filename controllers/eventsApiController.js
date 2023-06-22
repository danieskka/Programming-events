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

const getEvents = async (req, res) => {

    const event = await event
        .find()
        .populate('title price info image -_id')
        .select('title price info image -_id');

    res.status(200).json(event)
}

const createEvent = async (req, res) => {

    const { title, price, info, image } = req.body

    const event = new event({
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
    const {  title, price, info, image, new_title} = req.body;

    const event = await event
    .findOneAndUpdate({title: title}, {title: new_title,  title, price, info, image, event_id}, {returnOriginal: false})
    .select('-_id -__v')

    res.status(200).json({
        message: `Evento actualizado`,
        updated_event: event
    })
}

const deleteEvent = async (req, res) => {

    const { title } = req.body

    const event = await event
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

module.exports = {
    registerProfile,
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
    recoverPass,
    restorePass
}