const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

require('./utils/mongo_db');

const morgan = require('./utils/morgan')
const error404 = require('./middlewares/error404');

const app = express();
const port = 3000;

const eventsRoutes = require('./routes/eventsRoutes')
const eventsApiRoutes = require('./routes/eventsApiRoutes')
const authRoutes = require ('./routes/authRoutes')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
app.use(express.static('public'));

app.use(session({
    secret: 'qwqeDAdaF1231dAd1123aDAqdqd19ad943dADdad',
    resave: false,
    saveUninitialized: false
  }));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// Endpoints Web
app.use('/',eventsRoutes);

// Endpoints API
app.use('/api/',eventsApiRoutes);

// Endpoint Middlewares
app.use('/',authRoutes);

// Errores
app.use(error404);

app.listen(port, () => {
    console.log(`Puerto funcionando en el siguiente enlace: http://localhost:${port}`)
})