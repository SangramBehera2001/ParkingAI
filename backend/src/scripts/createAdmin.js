require('dotenv').config();

const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');
const { encrypt } = require('../utils/encryption');
const { hashData } = require('../utils/hash');

const run = async () => {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const phone = process.env.ADMIN_PHONE?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !phone || !password || password.length < 8) {
    throw new Error('Set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PHONE and ADMIN_PASSWORD (8+ characters) in .env');
  }

  const emailHash = hashData(email);
  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await prisma.user.findUnique({ where: { emailHash } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: { role: 'ADMIN', passwordHash }
    });
    console.log(`Updated admin account: ${email}`);
    return;
  }

  await prisma.user.create({
    data: {
      name: encrypt(name), email: encrypt(email), emailHash,
      phone: encrypt(phone), phoneHash: hashData(phone),
      passwordHash, role: 'ADMIN'
    }
  });
  console.log(`Created admin account: ${email}`);
};

run()
  .catch((error) => { console.error(error.message); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
