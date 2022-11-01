const {
  serverErrorMessage,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode, message } = err;
  if (statusCode === undefined) {
    res.status(500).send({ message: serverErrorMessage });
  }
  res.status(statusCode).send({ message });
};
