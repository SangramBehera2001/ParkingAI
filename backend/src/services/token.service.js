// 🔹 Fixed by Krishna
// Reason: Wrong prisma import path

const prisma = require('../prisma/client'); 
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const QRCode = require('qrcode');

const createToken = async (vehicleId) => {

  const publicToken = uuidv4();
  const privateToken = crypto.randomBytes(32).toString('hex');

  // 🔥 Move this later to ENV (we will fix later)
  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  const scanUrl = `${BASE_URL}/scan/${publicToken}`;

  const qrCodeUrl = await QRCode.toDataURL(scanUrl);

  // 🔹 Get vehicle
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
    include: { user: true }
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  // 🔹 Get available proxy
  const proxy = await prisma.proxyNumber.findFirst({
    where: {
      isActive: true,
      isBusy: false
    }
  });

  if (!proxy) {
    throw new Error("No proxy number available");
  }

  // 🔹 Create token
  const token = await prisma.token.create({
    data: {
      publicToken,
      privateToken,
      vehicleId,
      userId: vehicle.userId,
      proxyNumberId: proxy.id,
      qrCodeUrl
    }
  });

  // 🔥 Mark proxy as busy
  await prisma.proxyNumber.update({
    where: { id: proxy.id },
    data: { isBusy: true }
  });

  // ============================================
  // 🔥🔥 NEW FIX: AUTO RELEASE PROXY AFTER 5 MINUTES
  // ============================================
  setTimeout(async () => {
    try {
      console.log(`⏳ Releasing proxy ${proxy.number} after timeout`);

      await prisma.proxyNumber.update({
        where: { id: proxy.id },
        data: { isBusy: false }
      });

      console.log(`✅ Proxy ${proxy.number} released`);
    } catch (error) {
      console.error("❌ Error releasing proxy:", error.message);
    }
  }, 5 * 60 * 1000); // 5 minutes

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
      },
      proxyNumber: true
    }
  });
};

module.exports = {
  createToken,
  getTokenByPublicToken
};