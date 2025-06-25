const { Attendance } = require('../models');

const createAttendance = async (req, res) => {
  try {
    const { studentId, subjectId, date, status } = req.body;
    const attendance = await Attendance.create({ studentId, subjectId, date, status });
    res.status(201).json(attendance);
  } catch (err) {
    console.error('Create Attendance Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll();
    res.json(attendances);
  } catch (err) {
    console.error('Get Attendances Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json(attendance);
  } catch (err) {
    console.error('Get Attendance Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    const { status } = req.body;
    await attendance.update({ status });
    res.json(attendance);
  } catch (err) {
    console.error('Update Attendance Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    await attendance.destroy();
    res.json({ message: 'Attendance deleted' });
  } catch (err) {
    console.error('Delete Attendance Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
