const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Grade = sequelize.define('Grade', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Grade;
