const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subject = sequelize.define('Subject', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ensure subject name is unique
  },

  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ensure subject code is unique
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true, // allow null for subjects without a description
  },
});

module.exports = Subject;
// Note: The 'description' field is optional and can be used to provide additional information about the subject.
