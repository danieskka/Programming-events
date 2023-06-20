const mongoose = require('mongoose');
require('../utils/db_mongo') 
const fs = require('fs');

// const objectSchema = {
//     id: { 
//         type: Number, 
//         required: true,
//         unique: true
//     },
//     title: { 
//         type: String, 
//         required: true,
//         unique: true 
//     },
//     price: { 
//         type: Number, 
//         required: true 
//     },
//     description: { 
//         type: String, 
//         required: true 
//     },
//     info: { 
//         type: String, 
//         required: true 
//     },
//     image:{
//         type: String,
//         validate: {
//             validator: function(url){
//                 if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
//                     return true;
//                 else {
//                     return false;
//                 }
//             }, 
//             message: "Only JPG o PNG"
//         }
//     }
// };
// // Crear el esquema
// const scraperSchema = mongoose.Schema(objectSchema);


// // Crear el modelo --> Colección
// const Scraper = mongoose.model('Eventbrite', scraperSchema);

// module.exports = Scraper;

async function loadData() {
    try {
      const jsonData = fs.readFileSync('./scrapedData2.json', 'utf8');
      const data = JSON.parse(jsonData);
  
      const collection = mongoose.connection.collection('Info-conferences');
      const result = await collection.insertMany(data);
      console.log(`${result.insertedCount} documentos insertados.`);
  
      mongoose.connection.close();
    } catch (err) {
      console.error('Something went wrong', err);
    }
  }
  
  loadData();
