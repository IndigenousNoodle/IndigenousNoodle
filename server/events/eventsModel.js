var mongoose = require('mongoose');

var EventsSchema = new mongoose.Schema({
  title: String,
  host: String,
  reviews: [String],
  description: String,
  city: String,
  state: String,
  zipcode: Number,
  cost: Number,
  time: String
});

var Events = mongoose.model('Events', EventsSchema);

module.exports = Events;
