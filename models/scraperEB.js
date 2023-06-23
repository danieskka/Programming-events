const mongoose = require('mongoose');
require('../utils/mongo_db') 
const fs = require('fs');



// async function loadData() {
//     try {
//       const jsonData = fs.readFileSync('./scrapedData.json', 'utf8');
//       const data = JSON.parse(jsonData);
  

      const collection = mongoose.connection.collection('eventest');
      const result = await collection.insertMany(data);
      console.log(`${result.insertedCount} documentos insertados.`);
  
//       mongoose.connection.close();
//     } catch (err) {
//       console.error('Something went wrong', err);
//     }
//   }
  
//   loadData();

