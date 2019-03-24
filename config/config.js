const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  token: process.env.SLACK_TOKEN,
  botToken: process.env.BOT_SLACK_TOKEN
};
