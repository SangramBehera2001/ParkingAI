// const prisma = require('../prisma/client');

// const createVehicle = async (data) => {
//   return prisma.vehicle.create({
//     data
//   });
// };

// module.exports = {
//   createVehicle
// };



// vehicles.service.js
const prisma = require('../prisma/client');

const createVehicle = async (data) => {
  return prisma.vehicle.create({
    data,
    include: { user: true }   // ← returns the linked user in the response
  });
};

const getAllVehicles = async () => {
  return prisma.vehicle.findMany({
    include: { user: true },   // ← each vehicle shows its owner
    orderBy: { createdAt: 'desc' }
  });
};

const getVehicleById = async (id) => {
  return prisma.vehicle.findUnique({
    where: { id },
    include: { user: true, tokens: true }  // ← owner + their QR tokens
  });
};

module.exports = { createVehicle, getAllVehicles, getVehicleById };