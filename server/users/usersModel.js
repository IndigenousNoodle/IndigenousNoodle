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
  }],
  reviews:[{
    eventName: String,
    review: [String]
  }]
});

var Users = mongoose.model('Users', UsersSchema);


module.exports = Users;
