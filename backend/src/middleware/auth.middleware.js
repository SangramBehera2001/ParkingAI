const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

const requireAuth = (req, res, next) => {
  const authorization = req.get('authorization');
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = Number(payload.sub);

    if (!Number.isInteger(userId)) throw new Error('Invalid token subject');
    req.user = { id: userId };
    next();
  } catch (_error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Administrator access required' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireAuth, requireAdmin };
