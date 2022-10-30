module.exports = (err, req, res, next) => {
  const { statusCode, message } = err;
  if (statusCode === undefined) {
    res.status(500).send({ message: 'An error occured on the server' });
  }
  res.status(statusCode).send({ message });
};