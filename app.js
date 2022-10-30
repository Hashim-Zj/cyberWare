const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { logger } = require('./middlewares/logEvents');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

const rootRouter = require('./routes/root');
const sudoRouter = require('./routes/sudo');

const app = express();
// GLOBAL MIDDLEWARES
app.use(express.urlencoded({ extended: false })); // build in middleware to handle urlencoded form data
app.use(express.json()); // build in middleware for json
app.use(cookieParser());

app.set('view engine', 'ejs'); // view angine setup
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public'))); // static setup

app.use('/', rootRouter);
app.use('/sudo', sudoRouter);

console.log(process.env.NODE_ENV); // DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //Logger using morgam
}
// OR costom methords
app.use(logger); // costom middleware logger

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

