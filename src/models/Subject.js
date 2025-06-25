const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subject = sequelize.define('Subject', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Subject;
