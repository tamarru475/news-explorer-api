const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../config');
const AuthorizationError = require('../errors/authorization-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new AuthorizationError('Authorization required');
    next(error);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    const error = new AuthorizationError('Authorization required');
    next(error);
  }

  req.user = payload;

  next();
};