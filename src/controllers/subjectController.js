const { Subject } = require('../models');

const createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const subject = await Subject.create({ name, description, isActive: true });
    res.status(201).json(subject);
  } catch (err) {
    console.error('Create Subject Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll({ where: { isActive: true } });
    res.json(subjects);
  } catch (err) {
    console.error('Get Subjects Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (!subject || !subject.isActive)
      return res.status(404).json({ message: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    console.error('Get Subject Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (!subject || !subject.isActive)
      return res.status(404).json({ message: 'Subject not found' });
    const { name, description } = req.body;
    await subject.update({ name, description });
    res.json(subject);
  } catch (err) {
    console.error('Update Subject Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (!subject || !subject.isActive)
      return res.status(404).json({ message: 'Subject not found' });
    await subject.update({ isActive: false });
    res.json({ message: 'Subject deactivated' });
  } catch (err) {
    console.error('Delete Subject Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
