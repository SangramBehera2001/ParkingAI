const { createUserSchema } = require('../validators/user.schema');
const userService = require('../services/users.service');

const createUser = async (req, res, next) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const user = await userService.createUser(validatedData);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
};