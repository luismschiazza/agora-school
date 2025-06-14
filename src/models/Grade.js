const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Grade = sequelize.define('Grade', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ensure grade name is unique
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true, // allow null for grades without a description
  },

  level: {
    type: DataTypes.INTEGER,
    allowNull: false, // level is required
  },
});

module.exports = Grade;
// Note: The 'description' field is optional and can be used to provide additional information about the grade.
// The 'level' field is required and represents the grade level (e.g., 1 for first grade, 2 for second grade, etc.).
