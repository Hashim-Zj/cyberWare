const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, 'config.env') });
const app = require('./app');

// console.log(process.env);

// console.log(process.env.DATABASE);
// console.log(process.env.DATABASE_PASSWORD);
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
//   );

// console.log(process.env.DATABASE_LOCAL);
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((connect) => {
    // console.log(connect.connections);
    console.log('DB connected to cyberWare 💯');
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port} 💯`);
});
