var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  profileUrl: String,
  hostedEvents:[{
    title: String,
    description: String,
    city: String,
    state: String,
    zipcode:  Number,
    reviews:[String],
    time: String,
    confirmed: Boolean,
    usersApplied: [{username: String, userId: String, confirmed: Boolean}]
  }],
  joinedEvents: [{
    host: String,
    title: String,
    description: String,
    city: String,
    date: String,
    confirmed: Boolean,
    time: String,
    confirmed: Boolean,
    usersApplied: [{username: String, userId: String, confirmed: Boolean}]
  }],
  reviews:[{
    eventName: String,
    review: [String]
  }]
});


var Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
