const mongoose = require('mongoose');

const objectSchema = {
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
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