const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Teacher = sequelize.define('Teacher', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  specoalty: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  photo: {
    type: DataTypes.STRING,
    allowNull: true, // allow null for teachers without a photo
  },

  office: {
    type: DataTypes.STRING, // ex: 'secretary', 'coordinator, ', 'none'
    allowNull: true, // allow null for teachers without an office
    defaultValue: 'Teacher',
  },
});

module.exports = Teacher;
// Note: The 'photo' field is optional and can be used to store a URL or path to the teacher's photo.
// The 'office' field can be used to specify the teacher's office role, with a default value of 'Teacher'.
