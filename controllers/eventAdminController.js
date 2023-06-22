const event = require('./models/event')

// Obtiene todos los productos en la BBDD

const getEvents = async (req, res) => {

    const event = await event
        .find()
        .populate('title price info image -_id')
        .select('title price info image -_id');

    res.status(200).json(event)
}

// POST -> http://localhost:3000/api/admin/events
// Crea un nuevo producto en la BBDD

// {
//     "title": "The Bridge Tech Talk",
//     "price": 10,
//     "info": "Ven a descrubri los ultimo en tech",
//     "image": "The Bridge School"
// }

const createEvent = async (req, res) => {

    const { title, price, info, image } = req.body

    const event = new event({
        title,
        price,
        info,
        image
    });

    const result = await event.save();
    res.status(201).json({
        message: `Evento creado`,
        event: req.body
    })
}

// PUT -> http://localhost:3000/api/admin/events
// Actualiza un producto en la BBDD

// {
//     "title": "The Bridge Desafio de Tripulaciones",
//     "price": "Gratis",
//     "info": "Ven a ver los proyectos finales de nuestros tripulantes",
//     "image": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.meridioband.com%2Fwp-content%2Fuploads%2F2018%2F02%2FMeridio_PostBlog-1160x400.png&tbnid=OepdFOWHNkW2PM&vet=12ahUKEwjhgoX81tb_AhXdnycCHVt0BTUQMygBegUIARC4AQ..i&imgrefurl=https%3A%2F%2Fwww.meridioband.com%2Fit%2F4-best-tech-events-in-the-world%2F&docid=_U-YJqR3rWxtcM&w=1160&h=400&q=tech%20event&ved=2ahUKEwjhgoX81tb_AhXdnycCHVt0BTUQMygBegUIARC4AQ"
// }

const editEvent = async (req, res) => {
    const {  title, price, info, image, new_title} = req.body;

    const event = await event
    .findOneAndUpdate({title: title}, {title: new_title,  title, price, info, image, event_id}, {returnOriginal: false})
    .select('-_id -__v')

    res.status(200).json({
        message: `Evento actualizado`,
        updated_event: event
    })
}

// DELETE -> http://localhost:3000/api/admin/events
// Borra un producto en la BBDD

// {
//     "title": "Tortilla"
// }

const deleteEvent = async (req, res) => {

    const { title } = req.body

    const event = await event
    .findOneAndDelete({title: title})
    .select('-_id -__v')

    res.status(200).json({
        message: `Evento Borrado`,
        deleted_event: event
    })
}

module.exports = {
    getEvents,
    createEvent,
    editEvent,
    deleteEvent
}