const validator = require('validator');

const stringsRegex = /^[a-zA-Z0-9 ,.'-]+$/;

const articlesRegex = /.*/;

const dateRegex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

module.exports = { stringsRegex, dateRegex, validateURL, articlesRegex };
