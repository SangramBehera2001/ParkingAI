// 🔹 Modified by Dibyaranjan Swain
// Purpose: Add Exotel webhook support + keep existing structure intact

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const prisma = require('./prisma/client');

const usersRoutes = require('./routes/users.routes');
const vehiclesRoutes = require('./routes/vehicles.routes');
const tokenRoutes = require('./routes/token.routes');
const qrRoutes = require('./routes/qr.routes');
const scanRoutes = require('./routes/scan.routes');

// 🔹 Added by Dibyaranjan Swain
// Purpose: Handle Exotel call webhook
const callRoutes = require('./routes/call.routes');

const app = express();

app.use(helmet());
app.use(cors());

// 🔥 IMPORTANT: Exotel sends form-urlencoded data
// 🔹 Added by Dibyaranjan Swain
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(morgan('dev'));

// 🔹 Existing routes (UNCHANGED)
app.use('/api/users', usersRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/qr', qrRoutes);
app.use('/scan', scanRoutes);

// 🔥 NEW ROUTE
// 🔹 Added by Dibyaranjan Swain
app.use('/api/call', callRoutes);


// 🔹 Health check (UNCHANGED)
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'Server running', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});


// 🔹 Error handler (slightly improved)
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }

  // 🔹 Prisma unique constraint
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: `${err.meta?.target} already exists. Please use a different value.`
    });
  }

  // 🔹 Added by Dibyaranjan Swain
  // Purpose: cleaner error response for debugging
  res.status(500).json({
    success: false,
    message: err.message,
    type: err.constructor.name
  });
});

module.exports = app;