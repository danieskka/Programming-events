const mongoose = require('mongoose');
require('../utils/mongo_db') 
const fs = require('fs');

const objectSchema = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        // default: "https://adoption.microsoft.com/wp-content/uploads/2022/05/developer-icon.png"
        validate: {
            validator: function(url){
                if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "sólo imágenes JPG o PNG validas"
        }
    },
    info: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}

const briteSchema = new mongoose.Schema(objectSchema)

const Brite = mongoose.model('events', briteSchema);

module.exports = Brite;