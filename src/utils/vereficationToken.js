const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateEmailToken = (payload) => {
  jwt.sign(payload, process.env.EMAIL_USER, process.env.EXPIRES_EMAIL);
};

exports.verifyEmailToken = (token) => {
  jwt.verify(token, process.env.EMAIL_USER);
};
