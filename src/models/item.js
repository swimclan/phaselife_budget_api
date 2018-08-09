var Sequelize = require('sequelize');
var db = require('../db');

const sequelize = db.instance({});

const Item = sequelize.define('item', {
  categoryId: { type: Sequelize.INTEGER, allowNull: false },
  price: { type: Sequelize.INTEGER, allowNull: false }
});

// force: true will drop the table if it already exists
Item.sync({force: process.env.NODE_ENV === 'development'}).then(() => {
  console.log('Item model sync\'d');
});

module.exports = Item;