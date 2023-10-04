require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: new Date(
      Date.now() + 10 * 24 * 60 * 60 * 1000 
    )
  });
};