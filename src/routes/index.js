var {createItem, getItems} = require('../controllers');

var router = function (app) {
  app.get('/items', getItems)
  app.post('/item', createItem);
}

module.exports = router;