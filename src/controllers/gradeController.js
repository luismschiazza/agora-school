const { Grade } = require('../models');

const createGrade = async (req, res) => {
  try {
    const { studentId, subjectId, value, date } = req.body;
    const grade = await Grade.create({ studentId, subjectId, value, date, isActive: true });
    res.status(201).json(grade);
  } catch (err) {
    console.error('Create Grade Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll({ where: { isActive: true } });
    res.json(grades);
  } catch (err) {
    console.error('Get Grades Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (!grade || !grade.isActive) return res.status(404).json({ message: 'Grade not found' });
    res.json(grade);
  } catch (err) {
    console.error('Get Grade Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (!grade || !grade.isActive) return res.status(404).json({ message: 'Grade not found' });
    const { value, date } = req.body;
    await grade.update({ value, date });
    res.json(grade);
  } catch (err) {
    console.error('Update Grade Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (!grade || !grade.isActive) return res.status(404).json({ message: 'Grade not found' });
    await grade.update({ isActive: false });
    res.json({ message: 'Grade deactivated' });
  } catch (err) {
    console.error('Delete Grade Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
};
