require("dotenv").config();
const { env } = require("process");

const config = {
  app: {
    port: env.APP_PORT || 3000,
  },
};

module.exports = config;
