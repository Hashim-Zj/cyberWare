const mongoose = require('mongoose');
const errorHandler = require('./../middlewares/errorHandler');

const connectionDB = async function () {
  try {
    // const DB = process.env.DATABASE.replace(
    //   '<PASSWORD>',
    //   process.env.DATABASE_PASSWORD
    // );
    const DB = process.env.DATABASE_LOCAL;

    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
};

module.exports = connectionDB;
