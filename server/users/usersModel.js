var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  profileUrl: String,
  hostedEvents: {
    eventId: {
      title: String,
      description: String,
      city: String,
      state: String,
      zipcode:  Number,
      reviews:[String],
      time: String,
      confirmed: Boolean,
      usersApplied: {
        username: {
          confirmed: Boolean
        }
      }
    }
  },
  joinedEvents: {
    eventId: {
      host: String,
      title: String,
      description: String,
      city: String,
      date: String,
      confirmed: Boolean,
      time: String
    }
  }
});


var Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
