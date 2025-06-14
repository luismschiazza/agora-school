const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.register);

// login route
router.post('/register', authController.login);

// resfresh token route
router.post('/refresh-token', authController.refreshToken);

// logout route
router.post('/logout', authController.logout);

module.exports = router;
