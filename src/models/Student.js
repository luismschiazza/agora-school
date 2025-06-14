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
    unique: true, // ensure enrollment number is unique
  },

  photo: {
    type: DataTypes.STRING,
    allowNull: true, // allow null for students without a photo
  },
});

module.exports = Student;
// Note: The 'photo' field is optional and can be used to store a URL or path to the student's photo.
