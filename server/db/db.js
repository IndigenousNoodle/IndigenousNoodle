var Sequelize = require('sequelize');
var sequelize = new Sequelize('localhosts', 'root', '1234', {
  dialect: 'postgres'
});

var Events = sequelize.define('events', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zipcode: Sequelize.STRING,
  price: Sequelize.INTEGER,
  address: Sequelize.STRING,
  photoUrl: {type: Sequelize.TEXT, defaultValue: "https://s3-us-west-2.amazonaws.com/localhosts/eventImagePlaceholder.jpg"}
});


var Users = sequelize.define('users', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  photoUrl: {type: Sequelize.TEXT, defaultValue: "https://s3-us-west-2.amazonaws.com/localhosts/profileImagePlaceholder.png"}
});


var Reviews = sequelize.define('reviews', {
  review: Sequelize.STRING,
  rating: Sequelize.INTEGER
});


var Messages = sequelize.define('Messages', {
  text: Sequelize.STRING
});

var JoinersEvents = sequelize.define('joinersevents', {
  confirmed: Sequelize.BOOLEAN
});

var EventTimes = sequelize.define('eventtimes', {
  time: Sequelize.STRING
});

Messages.belongsTo(Users, {foreignKey: 'sender'});
Messages.belongsTo(Users, {foreignKey: 'receiver'});
JoinersEvents.belongsTo(Users);
JoinersEvents.belongsTo(Events);
Users.hasMany(Reviews, {foreignKey: 'usersHostId'});
Users.hasMany(Reviews, {foreignKey: 'usersJoinId'});
Events.hasMany(Reviews);
Users.hasMany(Events, {foreignKey: 'hostId', unique: false});
Events.hasMany(EventTimes, {foreighKey: 'eventId', unique: false});
EventTimes.hasOne(JoinersEvents);

Users.sync();
Events.sync();
Reviews.sync();
JoinersEvents.sync();
Messages.sync();
EventTimes.sync();

module.exports = {
  Users: Users,
  Events: Events,
  Reviews: Reviews,
  Messages: Messages,
  JoinersEvents: JoinersEvents,
  EventTimes: EventTimes
};