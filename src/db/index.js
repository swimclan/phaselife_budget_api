const Sequelize = require('sequelize');
let cache;

module.exports.instance = function(options={}) {
  if (!cache) {
    let {host, database, port, username, password} = options;
    cache = new Sequelize(database, username, password, {
      host: host,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      operatorsAliases: false
    });
  }
  return cache;
}