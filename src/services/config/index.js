var config = require('../../../assets/config.json');
var {get} = require('lodash');

module.exports.get = (path) => {
  return get(config, path, null);
}

