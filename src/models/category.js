var Sequelize = require('sequelize');
var db = require('../db');
var config = require('../services/config');
var {eachSeries} = require('async');

const sequelize = db.instance({});

const Category = sequelize.define('category', {
  name: { type: Sequelize.STRING, allowNull: false }
});

// force: true will drop the table if it already exists
Category.sync({force: true}).then(() => {
  const categories = config.get('app.categories');
  eachSeries(categories, (category, callback) => {
    Category.create({ name: category }).then(() => callback()).catch((err) => console.log(err));
  }, (error) => {
    console.log('Categories created.');
  });
  console.log('Category model sync\'d');
});

module.exports = Category;