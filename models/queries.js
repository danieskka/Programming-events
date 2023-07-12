const pool = require('../utils/db_pgsql'); // Conexión a la BBDD
const queries = require('../queries/users.queries'); // Queries SQL

// CREATE
const createUser = async (newUser) => {
    const { name, email, password } = newUser;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createUser,[name, email, password])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET

const getUsers = async () => {

    let client, result;
    try {
      client = await pool.connect();
      let data = await client.query(queries.getAllUsers);
      result = data.rows;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
        client.release();
    }
    return result;
  };
  
const getUsersByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getUsersByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
const updateUser = async (user) => {
    const { name, email, password, new_email } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateUser,[name, email, password, new_email])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE

const deleteUser = async (user) => {
    const { email } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteUser,[email])
        result = data.rowCount
        console.log(email);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
const createFav = async (newFav) => {
    const { name, date, image, info, description, email } = newFav;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createFav,[name, date, image, info, description, email])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
const getFavs = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllFavs)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
const getFavsByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getFavsByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE

const deleteFav = async (fav) => {
    const { title } = fav;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteFav,[title])
        result = data.rowCount
        console.log(title);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
const updateFav = async (favo) => {
    const { title, date, location, price, image, info, new_title } = favo;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateFav,[title, date, location, price, image, info, new_title])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
const logInUserTrue = async(email) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(queries.loggedTrue, [email]);
        result = data.rows;
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
 
const logInUserFalse = async(email) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(queries.loggedFalse, [email]);
        result = data.rows;
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

console.log('SQL connected');

const users_queries = {
    createUser,
    getUsersByEmail,
    getUsers,
    updateUser,
    deleteUser,
    createFav,
    deleteFav,
    updateFav,
    getFavs,
    getFavsByEmail,
    logInUserTrue,
    logInUserFalse
}

module.exports = users_queries;