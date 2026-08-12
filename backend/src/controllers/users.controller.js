const userService = require('../services/users.service');
const { decrypt } = require('../utils/encryption');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    const data = users.map((user) => ({
      id: user.id,
      name: decrypt(user.name),
      email: decrypt(user.email),
      phone: decrypt(user.phone),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      vehicles: user.vehicles
    }));

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers };
