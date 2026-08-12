const authService = require('../services/auth.service');
const { registerSchema, loginSchema } = require('../validators/auth.schema');

const register = async (req, res, next) => {
  try {
    const input = registerSchema.parse(req.body);
    const result = await authService.register(input);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const input = loginSchema.parse(req.body);
    const result = await authService.login(input);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const input = loginSchema.parse(req.body);
    const result = await authService.adminLogin(input);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, adminLogin };
