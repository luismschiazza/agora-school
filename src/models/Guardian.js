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
    unique: true, // ensure phone number is unique
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true, // allow null for guardians without an email
    validate: {
      isEmail: true, // validate email format
    },
  },
});

module.exports = Guardian;
// Note: The 'email' field is optional and can be used to store the guardian's email address.
// The 'phone' field is required and must be unique to ensure no two guardians have the same phone number.
