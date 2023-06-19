const getHome = (req, res) => {
    res.render("home");
}

const signUp = (req, res) => {
    res.status(200).send("Has mandado un GET de signUp")
}

const login = (req, res) => {
    res.status(200).send("Has mandado un GET de login")
}

const favorites = (req, res) => {
    res.status(200).send("Has mandado un GET de favoritos")
}

const profile = (req, res) => {
    res.status(200).send("Has mandado un GET de profile")
}

const users = (req, res) => {
    res.status(200).send("Has mandado un GET de users")
}

const dashboard = (req, res) => {
    res.status(200).send("Has mandado un GET de dashboard")
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