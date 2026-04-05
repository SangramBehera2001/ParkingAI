<<<<<<< Updated upstream
const prisma = require('../prisma/client');

const scanVehicle = async (publicToken) => {

=======
// 🔹 Modified & Structured by Dibyaranjan Swain
// 🔹 Module: Scan Service
// 🔹 Purpose:
//    - Handle QR scan requests
//    - Fetch vehicle + owner details using publicToken
//    - Return proxy (virtual) number instead of real phone
//    - Ensure privacy-first communication

const prisma = require('../prisma/client');



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

  // 🔹 Fetch token with relations
>>>>>>> Stashed changes
  const token = await prisma.token.findUnique({
    where: { publicToken },
    include: {
      vehicle: {
        include: {
          user: true
        }
<<<<<<< Updated upstream
      }
    }
  });

=======
      },
      proxyNumber: true   // 🔥 Required for virtual number
    }
  });

  // 🔹 Validation: Token existence + active status
>>>>>>> Stashed changes
  if (!token || !token.isActive) {
    throw new Error('Invalid or inactive QR code');
  }

<<<<<<< Updated upstream
  return {
    vehicleNumber: token.vehicle.vehicleNumber,
    ownerName: token.vehicle.user.name,
    // 🔐 hide phone partially
    phone: maskPhone(token.vehicle.user.phone)
  };
};

// helper function
=======
  // 🔹 Validation: Ensure proxy exists
  if (!token.proxyNumber) {
    throw new Error('Proxy number not assigned');
  }

  // 🔹 Response (privacy-safe)
  return {
    vehicleNumber: token.vehicle.vehicleNumber,
    ownerName: token.vehicle.user.name,

    // 🔥 Core Feature: Return proxy number
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
 *
 * 🔹 Example:
 *    9999888877 → ******8877
 */
>>>>>>> Stashed changes
const maskPhone = (phone) => {
  return phone.replace(/.(?=.{4})/g, '*');
};

<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
module.exports = {
  scanVehicle
};