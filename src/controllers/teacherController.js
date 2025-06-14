const { Teacher, User } = require('../models');

const createTeacher = async (req, res) => {
  try {
    const { name, subject, photo, email, password } = req.body;
    const user = await User.create({ email, password });
    const teacher = await Teacher.create({ name, subject, photo, userId: user.id });
    res.status(201).json(teacher);
  } catch (err) {
    console.error('Create Teacher Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllTeachers = async (req, res) => {
  const teachers = await Teacher.findAll({ where: { isActive: true }, include: User });
  res.json(teachers);
};

const getTeacherById = async (req, res) => {
  const teacher = await Teacher.findByPk(req.params.id, { include: User });
  if (!teacher || !teacher.isActive) return res.status(404).json({ message: 'Not found' });
  res.json(teacher);
};

const updateTeacher = async (req, res) => {
  const { name, subject, photo } = req.body;
  const teacher = await Teacher.findByPk(req.params.id);
  if (!teacher || !teacher.isActive) return res.status(404).json({ message: 'Not found' });
  await teacher.update({ name, subject, photo });
  res.json(teacher);
};

const deleteTeacher = async (req, res) => {
  const teacher = await Teacher.findByPk(req.params.id);
  if (!teacher || !teacher.isActive) return res.status(404).json({ message: 'Not found' });
  await teacher.update({ isActive: false });
  res.json({ message: 'Teacher deactivated' });
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
