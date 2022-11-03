const mongoose = require('mongoose');
const errorHandler = require('./../middlewares/errorHandler');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);


// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );
const DB = process.env.DATABASE_LOCAL;

const connectionDB = async function () {
  try {

    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
};

const store = new mongoDBSession({
  uri: DB, collection: 'Sessions'
});

module.exports = { connectionDB, store }
