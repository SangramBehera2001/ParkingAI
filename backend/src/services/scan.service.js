// // 🔹 Modified & Structured by Dibyaranjan Swain
// // 🔹 Module: Scan Service
// // 🔹 Purpose:
// //    - Handle QR scan requests
// //    - Fetch vehicle + owner details using publicToken
// //    - Return proxy (virtual) number instead of real phone
// //    - Ensure privacy-first communication

// const prisma = require('../prisma/client');



// /**
//  * 🔷 scanVehicle
//  * 🔹 Description:
//  *    Fetch vehicle and owner details using QR publicToken.
//  *    Returns proxy number (NOT real phone number).
//  *
//  * 🔹 Flow:
//  *    publicToken → Token → Vehicle → User + ProxyNumber
//  *
//  * 🔹 @param {string} publicToken
//  * 🔹 @returns {Object} vehicle + owner + proxy number
//  */
// const scanVehicle = async (publicToken) => {

//   // 🔹 Fetch token with relations
//   const token = await prisma.token.findUnique({
//     where: { publicToken },
//     include: {
//       vehicle: {
//         include: {
//           user: true
//         }
//       },
//       proxyNumber: true   // 🔥 Required for virtual number
//     }
//   });

//   // 🔹 Validation: Token existence + active status
//   if (!token || !token.isActive) {
//     throw new Error('Invalid or inactive QR code');
//   }

//   // 🔹 Validation: Ensure proxy exists
//   if (!token.proxyNumber) {
//     throw new Error('Proxy number not assigned');
//   }

//   // 🔹 Response (privacy-safe)
//   return {
//     vehicleNumber: token.vehicle.vehicleNumber,
//     ownerName: token.vehicle.user.name,

//     // 🔥 Core Feature: Return proxy number
//     phone: token.proxyNumber.number,

//     message: "Scan successful. You can contact the vehicle owner."
//   };
// };




// /**
//  * 🔹 maskPhone (Deprecated)
//  * 🔹 Created by Dibyaranjan Swain
//  * 🔹 Purpose:
//  *    Old approach to partially hide real phone numbers.
//  *    ❌ Not used in production (replaced by proxy system)
//  *
//  * 🔹 Example:
//  *    9999888877 → ******8877
//  */
// const maskPhone = (phone) => {
//   return phone.replace(/.(?=.{4})/g, '*');
// };



// module.exports = {
//   scanVehicle
// };


//-----------------


// 🔹 Modified & Structured by Dibyaranjan Swain
// 🔹 Module: Scan Service
// 🔹 Purpose:
//    - Handle QR scan requests
//    - Fetch vehicle + owner details using publicToken
//    - Return proxy (virtual) number instead of real phone
//    - Ensure privacy-first communication

// 🔹 Modified by Krishna
// Purpose: Added decryption of owner name using encryption utility

const prisma = require('../prisma/client');
const { decrypt } = require('../utils/encryption'); // 🔹 Added by Krishna


/**
 * 🔷 scanVehicle
 * 🔹 Description:
 *    Fetch vehicle and owner details using QR publicToken.
 *    Returns proxy number (NOT real phone number).
 *
 * 🔹 Flow:
 *    publicToken → Token → Vehicle → User + ProxyNumber
 *
 * 🔹 @param {string} publicToken
 * 🔹 @returns {Object} vehicle + owner + proxy number
 */
const scanVehicle = async (publicToken) => {

  // 🔹 Fetch token with all required relations
  const token = await prisma.token.findUnique({
    where: { publicToken },
    include: {
      vehicle: {
        include: {
          user: true
        }
      },
      proxyNumber: true   // 🔥 Required for virtual number
    }
  });

  // 🔹 Validation: Token existence + active status
  if (!token || !token.isActive) {
    throw new Error('Invalid or inactive QR code');
  }

  // 🔹 Validation: Ensure proxy exists
  if (!token.proxyNumber) {
    throw new Error('Proxy number not assigned');
  }

  // 🔹 Response (privacy-safe)
  // 🔹 Modified by Krishna — decrypt ownerName before returning
  return {
    vehicleNumber: token.vehicle.vehicleNumber,
    ownerName: decrypt(token.vehicle.user.name),  // 🔥 Decrypted by Krishna

    // 🔥 Core Feature: Return proxy number (never real phone)
    phone: token.proxyNumber.number,

    message: "Scan successful. You can contact the vehicle owner."
  };
};


/**
 * 🔹 maskPhone (Deprecated)
 * 🔹 Created by Dibyaranjan Swain
 * 🔹 Purpose:
 *    Old approach to partially hide real phone numbers.
 *    ❌ Not used in production (replaced by proxy system)
 *    ❌ Also replaced by encryption (Added by Krishna)
 *
 * 🔹 Example:
 *    9999888877 → ******8877
 */
const maskPhone = (phone) => {
  return phone.replace(/.(?=.{4})/g, '*');
};


module.exports = {
  scanVehicle
};