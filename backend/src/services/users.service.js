const prisma = require('../prisma/client');

const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

module.exports = {
  createUser,
  getAllUsers,
};