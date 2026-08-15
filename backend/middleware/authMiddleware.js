const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const { getUserById, isTokenRevoked } = require('../store');

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Missing or invalid Authorization header.' });
  }

  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Reject revoked tokens
    if (await isTokenRevoked(token)) {
      return res.status(401).json({ message: 'Token has been revoked.' });
    }
    req.user = { id: payload.sub };
    // Try to populate email and other user info if store supports it
    try {
      const user = await getUserById(payload.sub);
      if (user) {
        req.user.email = user.email || null;
        req.user.isPremium = Boolean(user.isPremium);
      }
    } catch (e) {
      // ignore lookup errors
    }
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

function adminMiddleware(req, res, next) {
  // First, allow a static admin secret header for simple deployments
  const adminSecret = process.env.ADMIN_SECRET;
  const provided = req.headers['x-admin-secret'];
  if (adminSecret && provided && provided === adminSecret) {
    req.user = req.user || {};
    req.user.isAdmin = true;
    return next();
  }

  // Fallback: if ADMIN_EMAILS is configured and user info is available on req.user.email
  // (future enhancement: populate req.user.email in authMiddleware by looking up DB)
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (adminEmails.length > 0 && req.user && req.user.email && adminEmails.includes(req.user.email)) {
    req.user.isAdmin = true;
    return next();
  }

  return res.status(403).json({ message: 'Admin access required.' });
}

module.exports = { authMiddleware, adminMiddleware };
