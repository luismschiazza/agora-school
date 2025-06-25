const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authController = require('../controllers/authController');
const permission = require('../middlewares/authMiddleware');
const limitLogin = require('../middlewares/limitLogin');
const { verifyEmailToken } = require('../utils/vereficationToken');

router.post('/register', authController.register);

router.post('/login', limitLogin, authController.login);

router.post('/refresh-token', permission, authController.refreshToken);

router.post('/logout', permission, authController.logout);

router.get('/verify-email', async (req, res, next) => {
  try {
    const { token } = req.query;
    const decoded = verifyEmailToken(token);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not fould!',
      });
    }

    await user.update({ emailVerified: true });
    res.status(200).json({
      message: 'Email verified successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Token is expired or invalid',
    });
  }
});

module.exports = router;
