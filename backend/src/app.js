const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const prisma = require('./prisma/client');
const usersRoutes = require('./routes/users.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/users', usersRoutes);

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'Server running', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

module.exports = app;