var {
  createItem,
  getItems,
  getCategories,
  deleteItem,
  setLimit
} = require('../controllers');

var router = function (app) {
  app.get('/items', getItems)
  app.post('/item', createItem);
  app.get('/categories', getCategories);
  app.delete('/item/:id', deleteItem);
  app.patch('/category/limit/:id', setLimit);
}

module.exports = router;
