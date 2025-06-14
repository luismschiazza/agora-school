const { Guardian } = require('../models');

const createGuardian = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const guardian = await Guardian.create({ name, email, phone });
    res.status(201).json(guardian);
  } catch (err) {
    console.error('Create Guardian Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllGuardians = async (req, res) => {
  const guardians = await Guardian.findAll({ where: { isActive: true } });
  res.json(guardians);
};

const getGuardianById = async (req, res) => {
  const guardian = await Guardian.findByPk(req.params.id);
  if (!guardian || !guardian.isActive) return res.status(404).json({ message: 'Not found' });
  res.json(guardian);
};

const updateGuardian = async (req, res) => {
  const { name, email, phone } = req.body;
  const guardian = await Guardian.findByPk(req.params.id);
  if (!guardian || !guardian.isActive) return res.status(404).json({ message: 'Not found' });
  await guardian.update({ name, email, phone });
  res.json(guardian);
};

const deleteGuardian = async (req, res) => {
  const guardian = await Guardian.findByPk(req.params.id);
  if (!guardian || !guardian.isActive) return res.status(404).json({ message: 'Not found' });
  await guardian.update({ isActive: false });
  res.json({ message: 'Guardian deactivated' });
};

module.exports = {
  createGuardian,
  getAllGuardians,
  getGuardianById,
  updateGuardian,
  deleteGuardian,
};
