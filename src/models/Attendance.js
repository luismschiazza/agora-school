const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Attendance = sequelize.define('Attendance', {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Students', // Assuming you have a Students model
      key: 'id',
    },
  },

  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Subjects', // Assuming you have a Subjects model
      key: 'id',
    },
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
// Note: The 'status' field can be used to indicate whether the student was present, absent, or late on a given date.
