// controllers/users.controller.js

const { createUserSchema } = require('../validators/user.schema');
const userService = require('../services/users.service');
const { encrypt, decrypt } = require('../utils/encryption');
const { hashData } = require('../utils/hash');


// ✅ CREATE USER (ENCRYPT + HASH)
const createUser = async (req, res, next) => {
  try {
    const validatedData = createUserSchema.parse(req.body);

    const { name, email, phone } = validatedData;

    const user = await userService.createUser({
      name: encrypt(name),

      email: encrypt(email),
      emailHash: hashData(email),

      phone: encrypt(phone),
      phoneHash: hashData(phone)
    });

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET ALL USERS (DECRYPT)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    const formattedUsers = users.map(user => ({
      ...user,
      name: user.name ? decrypt(user.name) : null,
      email: user.email ? decrypt(user.email) : null,
      phone: user.phone ? decrypt(user.phone) : null
    }));

    res.json({
      success: true,
      data: formattedUsers
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createUser,
  getAllUsers
};