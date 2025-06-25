const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  enrollment: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Student;
