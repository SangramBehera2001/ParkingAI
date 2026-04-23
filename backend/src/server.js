// require('dotenv').config();
// const app = require('./app');

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



//-------------------

// // 🔹 Added by Krishna
// // Purpose: One-time script to encrypt all existing plain-text user records
// // Run once: node src/scripts/migrateEncrypt.js

// require('dotenv').config();
// const prisma = require('../prisma/client');
// const { encrypt } = require('../utils/encryption');

// const migrate = async () => {
//   const users = await prisma.user.findMany();

//   for (const user of users) {
//     // 🔹 Added by Krishna — skip already-encrypted records (they contain ':')
//     const alreadyEncrypted = user.phone.includes(':');
//     if (alreadyEncrypted) {
//       console.log(`Skipping already encrypted user: ${user.id}`);
//       continue;
//     }

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         name:  encrypt(user.name),
//         email: encrypt(user.email),
//         phone: encrypt(user.phone),
//       }
//     });

//     console.log(`✅ Encrypted user ID: ${user.id}`);
//   }

//   console.log('Migration complete.');
//   await prisma.$disconnect();
// };

// migrate().catch(console.error);


// // Run it once:-> bash -> node src/scripts/migrateEncrypt.js

//=============



require('dotenv').config();

// 🔹 Removed by Krishna
// Reason: prisma not used in this file (unnecessary import)
// const prisma = require('./prisma/client');

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});