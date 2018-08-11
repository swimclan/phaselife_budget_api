const Sequelize = require('sequelize');
const models = require('../models');

let sequelize = {db: null, models: null};

module.exports.instance = function(options={}) {
  if (!sequelize.db && !sequelize.models) {
    let {host, database, port, username, password} = options;
    sequelize.db = new Sequelize(database, username, password, {
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
    sequelize.models = models(sequelize.db, Sequelize);
  }
  return sequelize;
}