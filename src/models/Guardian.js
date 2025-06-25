const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const e = require('express');

const Guardian = sequelize.define('Guardian', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = Guardian;
