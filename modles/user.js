const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/authorization-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9 ,.'-]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid name`,
    }
  }
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const error = new AuthorizationError('email or password are incorrect');
        return Promise.reject(error);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const error = new AuthorizationError('email or password are incorrect');
            return Promise.reject(error);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);