require('dotenv').config({ path: '../.env' });

const { NODE_ENV, JWT_SECRET = 'dev-secret' } = process.env;
module.exports = { NODE_ENV, JWT_SECRET };
