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

const addFavorite = (req, res) => {
    res.status(200).send("Has mandado un POST de guardar como favorito!");
}

const deleteFavorite = (req, res) => {
    res.status(202).send("Has mandado un DELETE de favoritos!");
}

const recoverPass = (req, res) => {
    res.status(200).send("Has mandado un GET de recuperar contraseña!");
}

const restorePass = (req, res) => {
    res.status(200).send("Has mandado un GET de cambiar contraseña!");
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