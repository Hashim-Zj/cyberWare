const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exportsLayouts = require('express-ejs-layouts');
const { logger } = require('./middlewares/logEvents');
const errorHandler = require('./middlewares/errorHandler');
const { store } = require('./config/dbConfig');

const rootRouter = require('./routes/userRouter');
const sudoRouter = require('./routes/sudo');

const app = express();
const MAX_AGE = 1000 * 60 * 60 * 24;

// GLOBAL MIDDLEWARES
app.use(express.urlencoded({ extended: false })); // build in middleware to handle urlencoded form data
app.use(express.json()); // build in middleware for json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    // name: '_id',
    key: '_id',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      expires: MAX_AGE,
    },
  })
);
app.use(exportsLayouts);

app.set('views', path.join(__dirname, 'views')); // Static files setup
app.set('view engine', 'ejs'); // view angine setup
app.set('layout', './layouts/index')
// app.set('layouts', path.join(__dirname), 'views', 'layouts', 'index')
app.use(express.static(path.join(__dirname, '/public'))); // static setup

console.log(process.env.NODE_ENV); // DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //Logger using morgam
}
// OR costom methords
app.use(logger); // costom middleware logger

app.use('/', rootRouter);
app.use('/sudo', sudoRouter);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.send('hello 404');
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

module.exports = app;
