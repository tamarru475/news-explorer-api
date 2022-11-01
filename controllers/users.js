const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modles/user');
const { NODE_ENV, JWT_SECRET } = require('../config/config');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const {
  emailExistMessage,
  noUserIdFoundMessage,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError(emailExistMessage);
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
  User.findOne({ _id: req.user._id })
    .orFail(() => {
      throw new NotFoundError(noUserIdFoundMessage);
    })
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => next(err));
};
