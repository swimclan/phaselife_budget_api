var {eachSeries} = require('async');
var winston = require('../services/logger');
var config = require('../services/config');

module.exports = function(sequelize, Sequelize) {
  const Category = sequelize.define('category', {
    id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false }
  });

  const Item = sequelize.define('item', {
    id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
    categoryId: { 
      type: Sequelize.INTEGER, 
      allowNull: false,
      unique: true
    },
    price: { type: Sequelize.INTEGER, allowNull: false }
  });

  Category.hasMany(Item, { foreignKey: 'categoryId', sourceKey: 'id' });

  Item.sync({force: process.env.NODE_ENV === 'development'}).then(() => {
    winston.info('Item model sync\'d successfully');
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
  });

  return {
    item: Item,
    category: Category
  };
}