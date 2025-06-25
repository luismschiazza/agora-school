const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Attendance = sequelize.define('Attendance', {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'late'),
    allowNull: false,
  },
});

module.exports = Attendance;
