'use strict';

const dotenv = require('dotenv');
dotenv.config();

const config = {
  username: process.env.TW_USERNAME,
  password: process.env.TW_CLIENT_ID,
  channel: process.env.TW_CHANNEL,
  logThisUser: process.env.TW_PERSON_TO_LOOK_AFTER
};

console.info(config);

module.exports = config;
