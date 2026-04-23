// services/users.service.js

const prisma = require('../prisma/client');


// ✅ CREATE USER WITH UNIQUE CHECK (USING HASH)
const createUser = async (data) => {

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { emailHash: data.emailHash },
        { phoneHash: data.phoneHash }
      ]
    }
  });

  if (existingUser) {
    throw new Error('User already exists with this email or phone');
  }

  return await prisma.user.create({
    data
  });
};


// ✅ GET ALL USERS (NO DECRYPT HERE)
const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      vehicles: true
    }
  });
};


module.exports = {
  createUser,
  getAllUsers
};