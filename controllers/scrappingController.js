const scraper = require('../utils/scraper') // ---Descomenta esta línea---

module.exports = {
    getHello: async (req, res) => {
            res.status(200).json({"mensaje":"La prueba funciona"});
    },
    getEvents: async (req, res) => {
        try {
            // ---Descomenta las 2 siguientes líneas para hacer scraping---
            const events = await scraper.scrap("https://www.eventbrite.es/d/spain--madrid/development/"); 
            res.status(200).json(events);
            //res.status(200).json({"mensaje":"Aquí irán los productos"}); // ---Comenta esta línea---

        } catch (error) {
            res.status(404).json({})
        }

    }
    
}