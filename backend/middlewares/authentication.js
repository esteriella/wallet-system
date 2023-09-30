const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");
import { createError } from "./errors.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
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
  const token = req.cookies.access_token;

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

    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized! User"));
    }
  });
};

const userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user)
        return res.json({
          status: true,
          user: user._id
        });
      else return res.json({ status: false });
    }
  });
};

module.exports = {
  userVerification,
  verifyToken,
  verifyLogin,
  verifyUser
}