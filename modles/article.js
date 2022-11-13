const mongoose = require('mongoose');
const validator = require('validator');
const { articlesRegex, dateRegex } = require('../utils/validation');

const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    validate: {
      validator(v) {
        return articlesRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid keyword`,
    },
    required: [true, 'article keyword is required'],
  },
  title: {
    type: String,
    validate: {
      validator(v) {
        return articlesRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid title`,
    },
    required: [true, 'article title is required'],
  },
  text: {
    type: String,
    validate: {
      validator(v) {
        return articlesRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid text`,
    },
    required: [true, 'article text is required'],
  },
  date: {
    type: String,
    validate: {
      validator(v) {
        return validator.isISO8601(v) || dateRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid date`,
    },
    required: [true, 'article date is required'],
  },
  source: {
    type: String,
    validate: {
      validator(v) {
        return articlesRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid source`,
    },
    required: [true, 'article source is required'],
  },
  link: {
    type: String,
    validate: [validator.isURL, 'invalid URL'],
    required: [true, 'URL is required'],
  },
  image: {
    type: String,
    validate: [validator.isURL, 'invalid URL'],
    required: [true, 'URL is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
