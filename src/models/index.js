var {eachSeries} = require('async');
var winston = require('../services/logger');
var config = require('../services/config');

module.exports = function(sequelize, Sequelize) {
  const Category = sequelize.define('category', {
    id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    limit: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
  });

  const Item = sequelize.define('item', {
    id: { type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
    categoryId: { 
      type: Sequelize.INTEGER, 
      allowNull: false,
      unique: false
    },
    price: { type: Sequelize.INTEGER, allowNull: false }
  });

  Category.hasMany(Item, { foreignKey: 'categoryId', sourceKey: 'id' });
  Item.belongsTo(Category, { foreignKey: 'categoryId', targetKey: 'id' });

  Category.sync({force: true}).then(() => {
    const categories = config.get('app.categories');
    eachSeries(categories, (category, callback) => {
      Category.create({ name: category.name, limit: category.limit }).then(() => callback()).catch((err) => winston.error(err.message));
    },
    (error) => {
      if (error) {
        winston.error('Error occured in categories creation.')
      }
      winston.info('Category model sync\'d successfully.');
      Item.sync({force: process.env.NODE_ENV === 'development'}).then(() => {
        winston.info('Item model sync\'d successfully');
      });
    });
  });

  return {
    item: Item,
    category: Category
  };
}