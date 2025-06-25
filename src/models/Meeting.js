const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Meeting = sequelize.define('Meeting', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  agenda: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Meeting;
