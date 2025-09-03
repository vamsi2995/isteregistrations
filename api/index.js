// api/index.js
require('dotenv').config();           // loads local .env for dev only (harmless on Vercel)
const serverless = require('serverless-http');

// require your exported app (adjust path if different)
const app = require('../server/app');

module.exports = serverless(app);
