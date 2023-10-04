const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { createError } = require("./errors.js");

const verifyToken = (req, res, next) => {
  const bearerToken =  req.headers.authorization?.split(' ')[1];
  const token = bearerToken || req.cookies.token; 

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = decodedToken;
    next();
  });
};

const verifyLogin = (req, res, next) => {
  const bearerToken =  req.headers.authorization?.split(' ')[1];
  const token = bearerToken || req.cookies.token;

  if (token) {
    // Verify the token and extract the user information
    jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        res.status(403).json({ message: "Unauthorized" });
      } else {
        // Set the user information on the request object
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "You're not logged in" });
  }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);

    if (req.user.id === req.params.userId) {
      next();
    } else {
      return next(createError(403, "You are not authorized! User"));
    }
  });
};

module.exports = {
  verifyToken,
  verifyLogin,
  verifyUser
}