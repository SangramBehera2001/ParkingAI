// const { PrismaClient } = require('@prisma/client');
// const prisma = require('../prisma/client');

// const prisma = new PrismaClient({
//   log: ['error', 'warn'],
// });

// module.exports = prisma;


// 🔹 Fixed by Krishna (IMPORTANT)
// Reason:
// ❌ Removed self-import (circular dependency)
// ❌ Removed duplicate prisma declaration
// ✅ Only one PrismaClient instance should exist

const { PrismaClient } = require('@prisma/client');

// 🔹 Created single instance (Singleton pattern)
const prisma = new PrismaClient({
  log: ['error', 'warn'], // optional logs
});

// 🔹 Export the instance
module.exports = prisma;