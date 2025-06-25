const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"School System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent: ' + info.messageId);
    return info;
  } catch (err) {
    console.error('Email error:', err);
    throw err;
  }
};

module.exports = sendMail;
