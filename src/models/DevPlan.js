const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DevPlan = sequelize.define('DevPlan', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('active', 'completed', 'archived'),
    defaultValue: 'active',
  },
});

module.exports = DevPlan;
