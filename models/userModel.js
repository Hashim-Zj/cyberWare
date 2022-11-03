const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserName: {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Users', userSchema);