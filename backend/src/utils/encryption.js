// 🔐 KEY ROTATION ENABLED ENCRYPTION (AES-256-GCM)

const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

// 🔥 Load keys from ENV
const KEYS = {
  v1: Buffer.from(process.env.KEY_V1, 'hex'),
  v2: Buffer.from(process.env.KEY_V2, 'hex'),
};

// 🔥 Current key version (used for new encryption)
const CURRENT_VERSION = process.env.CURRENT_KEY_VERSION || 'v1';

// 🔥 Validate keys at startup
const validateKeys = () => {
  Object.entries(KEYS).forEach(([version, key]) => {
    if (!key || key.length !== 32) {
      throw new Error(`❌ Invalid encryption key for ${version}`);
    }
  });
};

validateKeys();

// 🔹 Get key by version
const getKeyByVersion = (version) => {
  const key = KEYS[version];

  if (!key) {
    throw new Error(`❌ Unknown key version: ${version}`);
  }

  return key;
};


// ======================================
// 🔐 ENCRYPT
// ======================================
const encrypt = (plainText) => {
  if (!plainText) return null;

  const iv = crypto.randomBytes(IV_LENGTH);

  const key = getKeyByVersion(CURRENT_VERSION);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(String(plainText), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  // 🔥 FORMAT: version:iv:authTag:data
  return `${CURRENT_VERSION}:${iv.toString('hex')}:${authTag}:${encrypted}`;
};


// ======================================
// 🔓 DECRYPT
// ======================================
const decrypt = (encryptedText) => {
  if (!encryptedText) return null;

  try {
    const parts = encryptedText.split(':');

    // 🔥 Handle OLD DATA (no version)
    if (parts.length === 3) {
      const [ivHex, authTagHex, encrypted] = parts;

      const key = KEYS['v1']; // assume old data used v1

      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');

      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    }

    // 🔥 NEW DATA (versioned)
    const [version, ivHex, authTagHex, encrypted] = parts;

    const key = getKeyByVersion(version);

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;

  } catch (error) {
    console.error('❌ Decryption failed:', error.message);
    return null;
  }
};

module.exports = { encrypt, decrypt };