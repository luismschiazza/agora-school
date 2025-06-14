const { Student, User } = require('../models');

const createStudent = async (req, res) => {
  try {
    const { name, photo, email, password } = req.body;
    const user = await User.create({ email, password });
    const student = await Student.create({ name, photo, userId: user.id });
    res.status(201).json(student);
  } catch (err) {
    console.error('Create Student Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllStudents = async (req, res) => {
  const students = await Student.findAll({ where: { isActive: true }, include: User });
  res.json(students);
};

const getStudentById = async (req, res) => {
  const student = await Student.findByPk(req.params.id, { include: User });
  if (!student || !student.isActive) return res.status(404).json({ message: 'Not found' });
  res.json(student);
};

const updateStudent = async (req, res) => {
  const { name, photo } = req.body;
  const student = await Student.findByPk(req.params.id);
  if (!student || !student.isActive) return res.status(404).json({ message: 'Not found' });
  await student.update({ name, photo });
  res.json(student);
};

const deleteStudent = async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student || !student.isActive) return res.status(404).json({ message: 'Not found' });
  await student.update({ isActive: false });
  res.json({ message: 'Student deactivated' });
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
