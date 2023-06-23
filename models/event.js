const mongoose = require('mongoose');
require('../utils/mongo_db') 
const fs = require('fs');

const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true,
        unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    info: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Only JPG o PNG"
        }
    }
};
// Crear el esquema
const scraperSchema = mongoose.Schema(objectSchema);


// Crear el modelo --> Colección
const Events = mongoose.model('Events', scraperSchema);

module.exports = Events;

// Insertar un producto

// const p = new Events({
//     id: 6,
//     title: "Hola",
//     price: 1.80,
//     info: "Pruebas Pruebas",
//     image:"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.jpg"
// });

// // Guardar en la BBDD
// p.save()
// .then((data)=>console.log(data))
// .catch(err=>console.log(err)) 