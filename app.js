const express = require('express');

const morgan = require('./utils/morgan')
const error404 = require('./middlewares/error404');

const app = express();
const port = 3000;

const eventsRoutes = require('./routes/eventsRoutes')
const eventsApiRoutes = require('./routes/eventsApiRoutes')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
app.use(express.static('public'));

// Endpoints Web
app.use('/',eventsRoutes);

// Endpoints API
app.use('/api/',eventsApiRoutes);

// Errores
app.use(error404);

app.listen(port, () => {
    console.log(`Puerto funcionando en el siguiente enlace: http://localhost:${port}`)
})
