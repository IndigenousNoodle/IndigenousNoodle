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
  cost: Sequelize.STRING,
  time: Sequelize.STRING,
  address: Sequelize.STRING,
  photoUrl: Sequelize.TEXT
});


var Users = sequelize.define('users', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  photoUrl: Sequelize.TEXT
});


var Reviews = sequelize.define('reviews', {
  review: Sequelize.STRING,
  rating: Sequelize.INTEGER
});

var JoinersEvents = sequelize.define('joinersevents', {
  confirmed: Sequelize.BOOLEAN
});

Users.belongsToMany(Events, {through: 'joinersevents'});
Events.belongsToMany(Users, {through: 'joinersevents'});
Users.hasMany(Reviews, {foreignKey: 'usersHostId'});
Users.hasMany(Reviews, {foreignKey: 'usersJoinId'});
Events.hasMany(Reviews);
Users.hasMany(Events, {foreignKey: 'hostId'});

Users.sync();
Events.sync();
Reviews.sync();
JoinersEvents.sync();

module.exports = {
  Users: Users,
  Events: Events,
  Reviews: Reviews,
  JoinersEvents: JoinersEvents
};