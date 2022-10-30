const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  emailId: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model('Users', userSchema);