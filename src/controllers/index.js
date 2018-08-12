var winston = require('../services/logger');
var db = require('../db');
const sequelize = db.instance({});
const Item = sequelize.models.item;
const Category = sequelize.models.category;

module.exports.createItem = function(req, res, next) {
  Item.create(req.body).then((item) => {
    res.status(200).json(item);
  }).catch((err) => {
    winston.error(err.message);
  });
}

module.exports.getItems = function(req, res, next) {
  Item.findAll({ include: [{ model: Category }] }).then((items) => {
    res.status(200).json(items);
  }).catch((err) => {
    winston.error(err.message);
  });
}

module.exports.getCategories = function(req, res, next) {
  Category.findAll().then((categories) => {
    res.status(200).json(categories);
  }).catch((err) => {
    winston.error(err.message);
  });
}

module.exports.deleteItem = function(req, res, next) {
  Item.destroy({ where: { id: req.params.id } }).then((item) => {
    res.status(200).json(item);
  }).catch((err) => {
    winston.error(err.message);
  });
}