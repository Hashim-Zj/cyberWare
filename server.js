const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectionDB = require('./config/dbConfig');
const port = process.env.PORT || 4000;

const app = require('./app');
// console.log(process.env);

connectionDB(); // Connect to MongoDB

app.use(cors(corsOptions)); // Cross Origin resourse sharing

// server listening
mongoose.connection.once('open', () => {
  console.log('Connected to cyberWare DB 💯');

  app.listen(port, () => {
    console.log(`App running on port ${port} 💯`);
  });
});
