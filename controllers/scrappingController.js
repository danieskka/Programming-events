const scraper = require('../utils/scraper') 

module.exports = {
    getHello: async (req, res) => {
            res.status(200).json({"mensaje":"La prueba funciona"});
    },
    getEvents: async (req, res) => {
        try {
            const events = await scraper.scrap("https://www.eventbrite.es/d/spain/development/"); 
            res.status(200).json(events);

        } catch (error) {
            res.status(404).json({})
        }

    }
    
}


