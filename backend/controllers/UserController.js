const userVerification = require("../middlewares/authentication");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    res.status(200).send(user);
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    throw new Error(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { password: hashedPassword },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Password updated successfully", success: true });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  updatePassword
};
