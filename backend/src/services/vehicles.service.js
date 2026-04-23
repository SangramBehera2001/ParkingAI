// 🔹 Modified by Dibyaranjan Swain
// Purpose: Secure vehicle APIs by exposing proxy number instead of real phone

const prisma = require('../prisma/client');


// 🔷 CREATE VEHICLE
// 🔹 Returns vehicle + user (no proxy here yet, token created separately)
const createVehicle = async (data) => {
  return prisma.vehicle.create({
    data,
    include: {
      user: true
    }
  });
};



// 🔷 GET ALL VEHICLES
// 🔹 Includes latest proxy number using Token → ProxyNumber mapping
const getAllVehicles = async () => {

  const vehicles = await prisma.vehicle.findMany({
    include: {
      user: true,

      // 🔹 Added by Dibyaranjan Swain
      // Purpose: fetch latest token with proxy number
      tokens: {
        include: {
          proxyNumber: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 1   // only latest token
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // 🔹 Transform response (hide real phone)
  return vehicles.map(vehicle => ({
    id: vehicle.id,
    vehicleNumber: vehicle.vehicleNumber,
    ownerName: vehicle.user.name,

    // 🔥 IMPORTANT: expose proxy number instead of real phone
    phone: vehicle.tokens[0]?.proxyNumber?.number || null
  }));
};




// 🔷 GET VEHICLE BY ID
// 🔹 Returns single vehicle with proxy number (secure)
const getVehicleById = async (id) => {

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      user: true,

      // 🔹 Added by Dibyaranjan Swain
      // Purpose: fetch latest proxy mapping
      tokens: {
        include: {
          proxyNumber: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    }
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  // 🔹 Clean + secure response
  return {
    id: vehicle.id,
    vehicleNumber: vehicle.vehicleNumber,
    ownerName: vehicle.user.name,

    // 🔥 Proxy number exposed
    phone: vehicle.tokens[0]?.proxyNumber?.number || null
  };
};



module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById
};