var mongoose = require('mongoose');

// var UsersSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true
//   },
//   password: String,
//   profileUrl: String,
//   hostedEvents:[{
//     _id: String,
//     title: String,
//     description: String,
//     city: String,
//     state: String,
//     zipcode:  Number,
//     reviews:[String],
//     time: String,
//     confirmed: Boolean,
//     usersApplied: [{username: String, userId: String, confirmed: Boolean}]
//   }],
//   joinedEvents: [{
//     host: String,
//     title: String,
//     description: String,
//     city: String,
//     date: String,
//     time: String,
//     confirmed: Boolean,
//     usersApplied: [{username: String, userId: String, confirmed: Boolean}]
//   }],
//   reviews:[{
//     eventName: String,
//     review: [String]
//   }]
// });

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


// { 
//   "_id" : ObjectId("55e0ecfa422d86f0a3b37b90"), 
//   "username" : "Michael", 
//   "hostedEvents" : [ 
//     { "_id" : "1", "usersApplied" : [ ] } 
//   ],
//   "joinedEvents" : [ 
//     { "confirmed" : false } 
//   ] 
// }