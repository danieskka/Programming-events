const users_queries = {
    getAllUsers: `SELECT *
    FROM public.users;`,
    createUser: `INSERT INTO users(name, email, password)
        VALUES ($1, $2, $3);`,
    getUsersByEmail: `SELECT * FROM users
        WHERE email = $1;`,
    updateUser: `UPDATE users
        SET name=$1, email=$4, password=$3
        WHERE email = $2;`,
    deleteUser: `DELETE FROM users as a
        WHERE a.email = $1;`,
    createFav: `INSERT INTO favorites(name, date, image, info, description, email)
    VALUES ($1, $2, $3, $4, $5, $6);`,
    deleteFav: `DELETE FROM favorites as a
        WHERE a.title = $1;`,
    updateFav: `UPDATE favorites
        SET title=$7, date=$2, location=$3, price=$4, image=$5, info=$6
        WHERE title = $1;`,
    getFavsByEmail: `SELECT * FROM favorites
        WHERE email = $1;`,
    getAllFavs: `SELECT * FROM favorites;`
   
}
module.exports = users_queries;