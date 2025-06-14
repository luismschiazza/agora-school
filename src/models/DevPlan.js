const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DevPlan = sequelize.define('DevPlan', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ensure development plan name is unique
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true, // allow null for plans without a description
  },

  startDate: {
    type: DataTypes.DATE,
    allowNull: false, // start date is required
  },

  endDate: {
    type: DataTypes.DATE,
    allowNull: false, // end date is required
  },

  status: {
    type: DataTypes.ENUM('active', 'completed', 'archived'),
    defaultValue: 'active', // default status is active
  },
});

module.exports = DevPlan;
// Note: The 'description' field is optional and can be used to provide additional information about the development plan.
