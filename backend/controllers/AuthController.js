const User = require("../models/User");
const { createSecretToken } = require("../utils/Secrets");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { firstName, lastName, phone,accountNumber, email, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({  firstName, lastName, phone,accountNumber, email, password, createdAt  });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User created and signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};