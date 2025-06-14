const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Meeting = sequelize.define('Meeting', {
  title: {
    type: DataTypes.STRING,
    allowNull: false, // title is required
  },

  date: {
    type: DataTypes.DATE,
    allowNull: false, // date is required
  },

  time: {
    type: DataTypes.TIME,
    allowNull: false, // time is required
  },

  location: {
    type: DataTypes.STRING,
    allowNull: true, // allow null for meetings without a specific location
  },

  agenda: {
    type: DataTypes.TEXT,
    allowNull: true, // allow null for meetings without an agenda
  },
});

module.exports = Meeting;
// Note: The 'location' and 'agenda' fields are optional and can be used to provide additional information about the meeting.
