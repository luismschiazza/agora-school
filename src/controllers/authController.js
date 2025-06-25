const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/mailer');
const { generateEmailToken } = require('../utils/vereficationToken');
const { generateTokens } = require('../services/tokenService');

require('dotenv').config();

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists! Please log in!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = generateTokens({ id: newUser.id, email: newUser.email });
    await newUser.update({ refreshToken });

    const emailToken = generateEmailToken({
      id: newUser.id,
      email: newUser.email,
    });

    const verifyUrl = `http://localhost:3000/verify-email?token=${emailToken}`;

    await sendEmail({
      to: newUser.email,
      subject: 'Confirm your account, please.',
      html: `<p>Confirm your account clicking <a href="${verifyUrl}">HERE</a>.</p>`,
    });

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password! Try again!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password! Try again!' });
    }

    if (!user.emailVerified) {
      return res.status(403).json({ message: 'Email not verified. Please check your inbox.' });
    }

    const { accessToken, refreshToken } = generateTokens({ id: user.id, email: user.email });
    await user.update({ lastLogin: new Date(), refreshToken });

    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const userId = req.User?.id;
    if (userId) {
      await User.update({ refreshToken: null }, { where: { id: req.user.id } });
    }

    res.status(200).json({ message: 'Logout successful!' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      id: user.id,
      email: user.email,
    });
    await user.update({ refreshToken: newRefreshToken });

    res.status(200).json({
      message: 'Token refreshed successfully!',
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
