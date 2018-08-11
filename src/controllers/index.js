var db = require('../db');
const sequelize = db.instance({});
const Item = sequelize.models.item;
const Category = sequelize.models.category;

module.exports.createItem = function(req, res, next) {
  Item.create(req.body).then((item) => {
    res.status(200).json(item);
  });
}

module.exports.getItems = function(req, res, next) {
  Item.findAll().then((items) => {
    res.status(200).json(items);
  });
}

module.exports.getCategories = function(req, res, next) {
  Category.findAll().then((categories) => {
    res.status(200).json(categories);
  });
}