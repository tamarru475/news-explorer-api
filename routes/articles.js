const articleRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getArticles, createArticle, deleteArticleById } = require('../controllers/articles');
const ValidationError = require('../errors/validation-error');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

articleRouter.get('/articles', getArticles);

articleRouter.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateURL),
    image: Joi.string().required().custom(validateURL),
  }),
}), createArticle);

articleRouter.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).error(new ValidationError('Invalid ID')),
  }),
}), deleteArticleById);

module.exports = articleRouter;