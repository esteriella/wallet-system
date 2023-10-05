require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  console.log(process.env.SECRETS_TIME);
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: process.env.SECRETS_TIME
  });
};