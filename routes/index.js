const mainRouter = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');

mainRouter.use(usersRouter, articlesRouter);

module.exports = mainRouter;