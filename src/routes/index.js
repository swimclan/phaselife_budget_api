var {
  createItem,
  getItems,
  getCategories,
  deleteItem
} = require('../controllers');

var router = function (app) {
  app.get('/items', getItems)
  app.post('/item', createItem);
  app.get('/categories', getCategories);
  app.delete('/item/:id', deleteItem)
}

module.exports = router;