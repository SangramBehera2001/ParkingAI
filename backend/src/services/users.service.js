const prisma = require('../prisma/client');

const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

// const getAllUsers = async () => {
//   return prisma.user.findMany({
//     orderBy: { createdAt: 'desc' },
//   });
// };
const getAllUsers = async () => {
  return prisma.user.findMany({
    include: {
      vehicles: true
    }
  });
};

module.exports = {
  createUser,
  getAllUsers,
};