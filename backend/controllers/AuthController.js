const User = require("../models/User");
const { createSecretToken } = require("../utils/Secrets");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password
    });

    const wallet = new Wallet({
        user: user._id
    });

    await wallet.save(); 

    res.status(201).json({
      message: "User and wallet created successfully",
      success: true,
      user,
      wallet
    });
    next();
  } catch (error) {
    throw new Error(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true });
    next();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  signup,
  signin
};
