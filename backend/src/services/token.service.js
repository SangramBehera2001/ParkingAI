<<<<<<< Updated upstream
const prisma = require('../prisma/client');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const QRCode = require('qrcode'); // ✅ ADD THIS
=======
// 🔹 Modified by Dibyaranjan Swain
// Purpose: Add proxy number + user mapping WITHOUT breaking existing QR/token flow

const prisma = require('../prisma/client');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const QRCode = require('qrcode');
>>>>>>> Stashed changes

const createToken = async (vehicleId) => {

  const publicToken = uuidv4();
<<<<<<< Updated upstream

  const privateToken = crypto.randomBytes(32).toString('hex');

  // 🔗 This will be scanned by QR
  const scanUrl = `http://localhost:3000/scan/${publicToken}`;
  

  // ✅ Generate QR Code (Base64)
  const qrCodeUrl = await QRCode.toDataURL(scanUrl);

=======
  const privateToken = crypto.randomBytes(32).toString('hex');

  // 🔗 QR Scan URL (UNCHANGED)

  // changing the url from local host to ngrok to access it outside of local network for testing
  // const scanUrl = `http://localhost:3000/scan/${publicToken}`;

  // 🔹 Modified by Dibyaranjan Swain
  // Purpose: Make QR accessible from mobile using ngrok

// 🔹 Modified by Dibyaranjan Swain
    const BASE_URL = "https://unstocked-remy-pseudoviperously.ngrok-free.dev";

    const scanUrl = `${BASE_URL}/scan/${publicToken}`;


  // ✅ Generate QR Code (UNCHANGED)
  const qrCodeUrl = await QRCode.toDataURL(scanUrl);

  // 🔥 NEW STEP: Fetch vehicle → userId
  // 🔹 Added by Dibyaranjan Swain
  // Purpose: Required for fast call routing latercd ..
  
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
    include: { user: true }
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  // 🔥 NEW STEP: Get available proxy number
  // 🔹 Added by Dibyaranjan Swain
  // Purpose: Assign masked number for this token
  const proxy = await prisma.proxyNumber.findFirst({
    where: {
      isActive: true,
      isBusy: false
    }
  });

  if (!proxy) {
    throw new Error("No proxy number available");
  }

  // 🔥 CREATE TOKEN (UPDATED)
>>>>>>> Stashed changes
  const token = await prisma.token.create({
    data: {
      publicToken,
      privateToken,
      vehicleId,
<<<<<<< Updated upstream
      qrCodeUrl   // ✅ SAVE QR CODE
    }
  });

  return token;
};

=======
      userId: vehicle.userId,        // 🔥 NEW FIELD
      proxyNumberId: proxy.id,       // 🔥 NEW FIELD
      qrCodeUrl
    }
  });

  // 🔥 Mark proxy as busy
  // 🔹 Added by Dibyaranjan Swain
  await prisma.proxyNumber.update({
    where: { id: proxy.id },
    data: { isBusy: true }
  });

  return token;
};


// 🔹 Modified by Dibyaranjan Swain
// Purpose: Include proxyNumber for masked display
>>>>>>> Stashed changes
const getTokenByPublicToken = async (publicToken) => {
  return prisma.token.findUnique({
    where: { publicToken },
    include: {
      vehicle: {
        include: {
          user: true
        }
<<<<<<< Updated upstream
      }
=======
      },
      proxyNumber: true   // 🔥 NEW (for masked number)
>>>>>>> Stashed changes
    }
  });
};

module.exports = {
  createToken,
  getTokenByPublicToken
};