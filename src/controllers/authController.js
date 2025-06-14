const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { generateToken } = require('../services/tokenService');

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

    const token = generateToken(newUser.id, newUser.email);
    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
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
    const isPasswordValid = user && (await bcrypt.compare(password, user.password));

    if (!user && !isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password! Try again!' });
    }

    const token = generateToken({ id: user.id });
    await user.update({ lastLogin: new Date() });
    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = async (req, res, next) => {
  try {
    // Invalidate the token on the client side
    res.status(200).json({ message: 'Logout successful!' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOne({ where: { refreshToken } });
    const tokenRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (!refreshToken || !user) {
      return res.status(401).json({ message: 'Invalid refresh token or user!' });
    }
    if (user.id !== tokenRefresh.id) {
      return res.status(403).json({ message: 'Forbidden: Invalid user for this token!' });
    }

    const token = generateToken({ id: user.id });
    await user.update({ refreshToken: token.refreshToken });

    res.status(200).json({
      message: 'Token refreshed successfully!',
      token: token.accessToken,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
