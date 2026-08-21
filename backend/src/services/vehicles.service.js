const prisma = require('../prisma/client');
const { decrypt } = require('../utils/encryption');

const vehicleInclude = {
  user: true,
  tokens: {
    include: {
      proxyNumber: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 1
  }
};

const formatVehicle = (vehicle) => ({
  id: vehicle.id,
  vehicleNumber: vehicle.vehicleNumber,

  // Registered user's name
  ownerName: decrypt(vehicle.user.name),

  // Registered user's real phone number
  phone: decrypt(vehicle.user.phone),

  // Keep proxy number separately if you need it later
  proxyNumber:
    vehicle.tokens?.[0]?.proxyNumber?.number || null
});

const createVehicle = async (vehicleNumber, userId) => {
  const vehicle = await prisma.vehicle.create({
    data: {
      vehicleNumber,
      userId
    },
    include: vehicleInclude
  });

  return formatVehicle(vehicle);
};

const getAllVehicles = async (userId) => {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      userId
    },
    include: vehicleInclude,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return vehicles.map(formatVehicle);
};

const getVehicleById = async (id, userId) => {
  const vehicle = await prisma.vehicle.findFirst({
    where: {
      id,
      userId
    },
    include: vehicleInclude
  });

  return vehicle ? formatVehicle(vehicle) : null;
};

const updateVehicle = async (id, userId, vehicleNumber) => {
  const existing = await prisma.vehicle.findFirst({
    where: {
      id,
      userId
    }
  });

  if (!existing) {
    return null;
  }

  const vehicle = await prisma.vehicle.update({
    where: {
      id
    },
    data: {
      vehicleNumber
    },
    include: vehicleInclude
  });

  return formatVehicle(vehicle);
};

const deleteVehicle = async (id, userId) => {
  const existing = await prisma.vehicle.findFirst({
    where: {
      id,
      userId
    }
  });

  if (!existing) {
    return false;
  }

  await prisma.vehicle.delete({
    where: {
      id
    }
  });

  return true;
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};