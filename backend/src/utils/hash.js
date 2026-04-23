const crypto = require('crypto');

const hashData = (data) => {
  if (!data) return null;

  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');
};

module.exports = { hashData };