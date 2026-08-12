const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');
const { encrypt, decrypt } = require('../utils/encryption');
const { hashData } = require('../utils/hash');

const publicUser = (user) => ({
  id: user.id,
  name: decrypt(user.name),
  email: decrypt(user.email),
  phone: decrypt(user.phone)
  ,role: user.role
});

const createAccessToken = (userId) => {
  return jwt.sign(
    { sub: String(userId) },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const register = async ({ name, email, phone, password }) => {
  const emailHash = hashData(email);
  const phoneHash = hashData(phone);
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ emailHash }, { phoneHash }] }
  });

  if (existingUser) {
    const error = new Error('An account already exists with this email or phone');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name: encrypt(name),
      email: encrypt(email),
      emailHash,
      phone: encrypt(phone),
      phoneHash,
      passwordHash
    }
  });

  return { user: publicUser(user), token: createAccessToken(user.id) };
};

const login = async ({ email, password }, requiredRole = null) => {
  const user = await prisma.user.findUnique({
    where: { emailHash: hashData(email) }
  });

  if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  if (requiredRole && user.role !== requiredRole) {
    const error = new Error('Administrator access required');
    error.statusCode = 403;
    throw error;
  }

  return { user: publicUser(user), token: createAccessToken(user.id) };
};

const adminLogin = (input) => login(input, 'ADMIN');

module.exports = { register, login, adminLogin };
