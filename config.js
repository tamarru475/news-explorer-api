require('dotenv').config({ path: '../.env' });

const { NODE_ENV, JWT_SECRET = 'dev-secret', DATABASE_NAME = 'azure-developer-name', DATABASE_URL } = process.env;
module.exports = { NODE_ENV, JWT_SECRET, DATABASE_NAME, DATABASE_URL };
