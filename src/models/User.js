const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 20], //password must be between 10 and 20 characters
    },
  },

  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true, // allow null for users without a refresh token
  },
});

module.exports = User;
