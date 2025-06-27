const rateLimit = require('express-rate-limit');

const limitLogin = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: '',
  keyGenerator: (req) => req.body.email || req.ip,
});

module.exports = limitLogin;
