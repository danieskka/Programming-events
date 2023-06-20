const mongoose = require('mongoose');
require('../utils/db_mongo') 

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
    description: { 
        type: String, 
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
const Scraper = mongoose.model('Eventbrite', scraperSchema);

module.exports = Scraper;