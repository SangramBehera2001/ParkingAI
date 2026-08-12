require('dotenv').config();

const prisma = require('../prisma/client');
const { hashData } = require('../utils/hash');
const app = require('../app');

let apiUrl;

const request = async (path, options = {}) => {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`${path} returned ${response.status}: ${body.message}`);
  return body;
};

const run = async () => {
  const unique = String(Date.now());
  const email = `auth-test-${unique}@example.com`;
  const phone = unique.slice(-10);
  const password = 'Integration123!';
  const proxyNumber = `TEST-${unique}`;
  let usedProxyId;
  const server = app.listen(0, '127.0.0.1');

  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });

  const address = server.address();
  apiUrl = `http://127.0.0.1:${address.port}/api`;

  try {
    await prisma.proxyNumber.create({
      data: { number: proxyNumber }
    });

    const registration = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: 'Auth Test User', email, phone, password })
    });
    if (!registration.data.token) throw new Error('Registration did not return a token');

    const login = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (!login.data.token) throw new Error('Login did not return a token');

    await request('/vehicles', {
      headers: { Authorization: `Bearer ${login.data.token}` }
    });

    const vehicle = await request('/vehicles', {
      method: 'POST',
      headers: { Authorization: `Bearer ${login.data.token}` },
      body: JSON.stringify({ vehicleNumber: `TEST-${unique}` })
    });

    const token = await request('/tokens', {
      method: 'POST',
      headers: { Authorization: `Bearer ${login.data.token}` },
      body: JSON.stringify({ vehicleId: vehicle.data.id })
    });
    if (!token.data.qrCodeUrl?.startsWith('data:image/png')) {
      throw new Error('QR generation did not return a PNG data URL');
    }
    usedProxyId = token.data.proxyNumberId;

    const adminLogin = await request('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      })
    });
    const users = await request('/users', {
      headers: { Authorization: `Bearer ${adminLogin.data.token}` }
    });
    if (users.data.some((user) => 'passwordHash' in user)) {
      throw new Error('Admin users response exposed password hashes');
    }

    console.log('PASS: register, login, vehicle creation, QR generation, admin login and protected endpoints');
  } finally {
    await prisma.user.deleteMany({ where: { emailHash: hashData(email) } });
    if (usedProxyId) {
      await prisma.proxyNumber.updateMany({
        where: { id: usedProxyId },
        data: { isBusy: false }
      });
    }
    await prisma.proxyNumber.deleteMany({ where: { number: proxyNumber } });
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    await prisma.$disconnect();
  }
};

run().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
});
