require('dotenv').config({ path: '../.env' });

const {
  NODE_ENV, JWT_SECRET = 'dev-secret', MONGODB_URI = 'mongodb://localhost:27017/newsexplorer', PORT = 3001,
} = process.env;
module.exports = {
  NODE_ENV, JWT_SECRET, MONGODB_URI, PORT,
};
