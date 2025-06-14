const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET, JWT_REFRESH_SECRET, EXPIRES_IN, EXPIRES_IN_REFRESH } = process.env;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: EXPIRES_IN_REFRESH });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = { generateTokens };
