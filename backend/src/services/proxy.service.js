// // 🔹 Created by Dibyaranjan Swain
// // Purpose: Get available proxy number safely

// const prisma = require('../../config/prisma');

// exports.getAvailableProxy = async () => {
//   const proxy = await prisma.proxyNumber.findFirst({
//     where: {
//       isActive: true,
//       isBusy: false
//     }
//   });

//   if (!proxy) {
//     throw new Error("No proxy number available");
//   }

//   return proxy;
// };


// 🔹 Fixed by Krishna
// Reason: Wrong import path → causing runtime failure

const prisma = require('../prisma/client'); // ✅ corrected path

exports.getAvailableProxy = async () => {
  const proxy = await prisma.proxyNumber.findFirst({
    where: {
      isActive: true,
      isBusy: false
    }
  });

  if (!proxy) {
    throw new Error("No proxy number available");
  }

  return proxy;
};