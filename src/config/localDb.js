const { Sequelize } = require('sequelize');

const localDb = new Sequelize({
  dialect: 'sqlite',
  storage: './offiline-db.sqlite',
  logging: false,
});

module.exports = localDb;
