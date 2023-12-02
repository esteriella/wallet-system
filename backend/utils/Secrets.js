require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretTime = process.env.SECRETS_TIME;

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: secretTime
  });
};