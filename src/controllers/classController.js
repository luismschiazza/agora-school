const { Class } = require('../models');

const createClass = async (req, res) => {
  try {
    const { name, section, subjectId, teacherId } = req.body;

    const newClass = await Class.create({
      name,
      section,
      subjectId,
      teacherId,
      isActive: true, // considerando que você queira esse campo
    });

    res.status(201).json(newClass);
  } catch (err) {
    console.error('Create Class Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({ where: { isActive: true } });
    res.json(classes);
  } catch (err) {
    console.error('Get Classes Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getClassById = async (req, res) => {
  try {
    const foundClass = await Class.findByPk(req.params.id);
    if (!foundClass || !foundClass.isActive) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(foundClass);
  } catch (err) {
    console.error('Get Class Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateClass = async (req, res) => {
  try {
    const foundClass = await Class.findByPk(req.params.id);
    if (!foundClass || !foundClass.isActive) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const { name, section, subjectId, teacherId } = req.body;
    await foundClass.update({ name, section, subjectId, teacherId });

    res.json(foundClass);
  } catch (err) {
    console.error('Update Class Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteClass = async (req, res) => {
  try {
    const foundClass = await Class.findByPk(req.params.id);
    if (!foundClass || !foundClass.isActive) {
      return res.status(404).json({ message: 'Class not found' });
    }
    // só desativa, não deleta da base
    await foundClass.update({ isActive: false });
    res.json({ message: 'Class deactivated' });
  } catch (err) {
    console.error('Delete Class Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
