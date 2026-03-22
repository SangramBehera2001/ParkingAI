const prisma = require('../prisma/client');

const scanVehicle = async (publicToken) => {

  const token = await prisma.token.findUnique({
    where: { publicToken },
    include: {
      vehicle: {
        include: {
          user: true
        }
      }
    }
  });

  if (!token || !token.isActive) {
    throw new Error('Invalid or inactive QR code');
  }

  return {
    vehicleNumber: token.vehicle.vehicleNumber,
    ownerName: token.vehicle.user.name,
    // 🔐 hide phone partially
    phone: maskPhone(token.vehicle.user.phone)
  };
};

// helper function
const maskPhone = (phone) => {
  return phone.replace(/.(?=.{4})/g, '*');
};

module.exports = {
  scanVehicle
};