const prisma = require('../prisma/client');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const QRCode = require('qrcode'); // ✅ ADD THIS

const createToken = async (vehicleId) => {

  const publicToken = uuidv4();

  const privateToken = crypto.randomBytes(32).toString('hex');

  // 🔗 This will be scanned by QR
  const scanUrl = `http://localhost:3000/scan/${publicToken}`;
  

  // ✅ Generate QR Code (Base64)
  const qrCodeUrl = await QRCode.toDataURL(scanUrl);

  const token = await prisma.token.create({
    data: {
      publicToken,
      privateToken,
      vehicleId,
      qrCodeUrl   // ✅ SAVE QR CODE
    }
  });

  return token;
};

const getTokenByPublicToken = async (publicToken) => {
  return prisma.token.findUnique({
    where: { publicToken },
    include: {
      vehicle: {
        include: {
          user: true
        }
      }
    }
  });
};

module.exports = {
  createToken,
  getTokenByPublicToken
};