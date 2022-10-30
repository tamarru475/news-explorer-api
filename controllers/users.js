const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modles/user');
const { NODE_ENV, JWT_SECRET } = require('../config');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError('user already exists');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name,
        })
          .then((user) => {
            res.send({
              _id: user._id,
              email: user.email,
              name: user.name,
            });
          })
          .catch((err) => next(err)));
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  const { email, name, } = req.body;
  User.findOne({ email, name })
    .orFail(() => {
      throw new NotFoundError('No user with this info');
    })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};