var {eachSeries} = require('async');
var winston = require('../services/logger');
var config = require('../services/config');

module.exports = function(sequelize, Sequelize) {
  const Category = sequelize.define('category', {
    name: { type: Sequelize.STRING, allowNull: false }
  });

  Category.sync({force: true}).then(() => {
    const categories = config.get('app.categories');
    eachSeries(categories, (category, callback) => {
      Category.create({ name: category }).then(() => callback()).catch((err) => winston.error(err.message));
    },
    (error) => {
      if (error) {
        winston.error('Error occured in categories creation.')
      }
      winston.info('Categories created.');
    });
    winston.info('Category model sync\'d successfully.');
  });

  const Item = sequelize.define('item', {
    category_id: { 
      type: Sequelize.INTEGER, 
      allowNull: false
    },
    price: { type: Sequelize.INTEGER, allowNull: false }
  });

  Item.sync({force: process.env.NODE_ENV === 'development'}).then(() => {
    winston.info('Item model sync\'d successfully');
  });

  Item.hasOne(Category);
  Category.belongsToMany(Item);

  return {
    item: Item,
    category: Category
  };
}