const User = require("../models/User");
const Wallet = require("../models/Wallet");
const { createSecretToken } = require("../utils/Secrets");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password
    });

    const wallet = await Wallet.create({
      user: user._id
    });

    res.status(201).json({
      message: "User and wallet created successfully",
      success: true
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email", success: false });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email", success: false });
    }
    const userId = user._id;
    const isVerified = user.isVerified;
    const token = createSecretToken(userId);
    const cookieTime = parseInt(process.env.COOKIE_TIME, 10);
    res
      .cookie("token", token, {
        expires: new Date(
          Date.now() + cookieTime
        ),
        sameSite: "none",
        secure: true,
        withCredentials: true,
        httpOnly: false
      })
      .status(201)
      .json({
        message: "User signed in successfully",
        success: true,
        userId,
        isVerified,
        token
      });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  signup,
  signin
};
