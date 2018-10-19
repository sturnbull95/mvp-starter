const connection = require('./');
const Sequelize = require('sequelize');
const Favorites = connection.define(
  "Favorites",
  {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: Sequelize.STRING},
    img: {type: Sequelize.STRING}
  },
  {
    timestamps: false
  }
);

connection.sync().then(() => console.log('synced!')).catch(err => console.error(err));
module.exports = {Favorites};
