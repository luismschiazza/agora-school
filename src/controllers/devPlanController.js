// controllers/developmentPlanController.js
const { DevelopmentPlan } = require('../models');

const createDevelopmentPlan = async (req, res) => {
  try {
    const { title, description, teacherId, status } = req.body;
    // status pode ser algo tipo 'pending', 'in progress', 'completed'

    const developmentPlan = await DevelopmentPlan.create({
      title,
      description,
      teacherId,
      status,
      isActive: true,
    });

    res.status(201).json(developmentPlan);
  } catch (err) {
    console.error('Create DevelopmentPlan Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllDevelopmentPlans = async (req, res) => {
  try {
    const plans = await DevelopmentPlan.findAll({ where: { isActive: true } });
    res.json(plans);
  } catch (err) {
    console.error('Get DevelopmentPlans Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getDevelopmentPlanById = async (req, res) => {
  try {
    const plan = await DevelopmentPlan.findByPk(req.params.id);
    if (!plan || !plan.isActive) {
      return res.status(404).json({ message: 'Development Plan not found' });
    }
    res.json(plan);
  } catch (err) {
    console.error('Get DevelopmentPlan Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateDevelopmentPlan = async (req, res) => {
  try {
    const plan = await DevelopmentPlan.findByPk(req.params.id);
    if (!plan || !plan.isActive) {
      return res.status(404).json({ message: 'Development Plan not found' });
    }

    const { title, description, status } = req.body;
    await plan.update({ title, description, status });

    res.json(plan);
  } catch (err) {
    console.error('Update DevelopmentPlan Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteDevelopmentPlan = async (req, res) => {
  try {
    const plan = await DevelopmentPlan.findByPk(req.params.id);
    if (!plan || !plan.isActive) {
      return res.status(404).json({ message: 'Development Plan not found' });
    }
    await plan.update({ isActive: false });
    res.json({ message: 'Development Plan deactivated' });
  } catch (err) {
    console.error('Delete DevelopmentPlan Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createDevelopmentPlan,
  getAllDevelopmentPlans,
  getDevelopmentPlanById,
  updateDevelopmentPlan,
  deleteDevelopmentPlan,
};
