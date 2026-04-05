// 🔹 Modified by Dibyaranjan Swain
// Purpose: Setup Express app with Exotel webhook + improved middleware structure
// Changes:
// 1. Moved body parsers to top (required for Exotel form-data)
// 2. Added 404 handler
// 3. Improved error handling (safe for production)
// 4. Kept existing project structure intact

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
<<<<<<< Updated upstream
=======

// 🔹 Added by Dibyaranjan Swain
// Purpose: Handle Exotel call webhook routes
const callRoutes = require('./routes/call.routes');
>>>>>>> Stashed changes

const app = express();

// 🔥 IMPORTANT: Body parsing MUST come first (Exotel sends form-urlencoded)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Security + middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
<<<<<<< Updated upstream
app.use('/api/users', usersRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/qr', qrRoutes);
app.use('/scan', scanRoutes);    //  no /api prefix, just /scan
=======
>>>>>>> Stashed changes

// 🔹 Existing routes (UNCHANGED)
app.use('/api/users', usersRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/qr', qrRoutes);
app.use('/scan', scanRoutes);

// 🔥 NEW ROUTE
// 🔹 Added by Dibyaranjan Swain
// Purpose: Enable proxy call handling via Exotel
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

<<<<<<< Updated upstream
// app.use((err, req, res, next) => {
//   console.error(err);

//   if (err.name === 'ZodError') {
//     return res.status(400).json({
//       success: false,
//       errors: err.errors,
//     });
//   }

//   res.status(500).json({
//     success: false,
//     message: 'Internal Server Error',
//   });
// });

=======
// 🔹 Added by Dibyaranjan Swain
// Purpose: Handle unknown routes (important for production)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// 🔹 Modified by Dibyaranjan Swain
// Purpose: Improve error handling + avoid exposing sensitive details
>>>>>>> Stashed changes
app.use((err, req, res, next) => {
  console.error(err);

  // 🔹 Zod validation error
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }

<<<<<<< Updated upstream
  // Handle Prisma unique constraint errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: `${err.meta?.target} already exists. Please use a different value.`
    });
  }

  res.status(500).json({
    success: false,
    message: err.message,
    type: err.constructor.name
=======
  // 🔹 Prisma unique constraint error
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'Duplicate value already exists'
    });
  }

  // 🔹 Generic error (safe for production)
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
>>>>>>> Stashed changes
  });
});

module.exports = app;