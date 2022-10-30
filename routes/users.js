const usersRouter = require('express').Router();
const { getCurrentUser } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate')

usersRouter.get('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), getCurrentUser);

module.exports = usersRouter;