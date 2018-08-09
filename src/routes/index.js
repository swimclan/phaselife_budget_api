var {
  createItem,
  getItems,
  getCategories
} = require('../controllers');

var router = function (app) {
  app.get('/items', getItems)
  app.post('/item', createItem);
  app.get('/categories', getCategories);
}

module.exports = router;