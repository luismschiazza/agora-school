const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('./jobs/checkStudentPerformance');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

// Função para iniciar o servidor
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
};

startServer();
