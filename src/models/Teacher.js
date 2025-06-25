const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Teacher = sequelize.define('Teacher', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  specoalty: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  office: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Teacher',
  },
});

module.exports = Teacher;
