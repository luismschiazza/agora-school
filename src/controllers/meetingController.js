const { Meeting } = require('../models');

const createMeeting = async (req, res) => {
  try {
    const { teacherId, date, topic, notes } = req.body;
    const meeting = await Meeting.create({ teacherId, date, topic, notes, isActive: true });
    res.status(201).json(meeting);
  } catch (err) {
    console.error('Create Meeting Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.findAll({ where: { isActive: true } });
    res.json(meetings);
  } catch (err) {
    console.error('Get Meetings Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting || !meeting.isActive)
      return res.status(404).json({ message: 'Meeting not found' });
    res.json(meeting);
  } catch (err) {
    console.error('Get Meeting Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting || !meeting.isActive)
      return res.status(404).json({ message: 'Meeting not found' });
    const { date, topic, notes } = req.body;
    await meeting.update({ date, topic, notes });
    res.json(meeting);
  } catch (err) {
    console.error('Update Meeting Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting || !meeting.isActive)
      return res.status(404).json({ message: 'Meeting not found' });
    await meeting.update({ isActive: false });
    res.json({ message: 'Meeting deactivated' });
  } catch (err) {
    console.error('Delete Meeting Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
