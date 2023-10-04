const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    // Destructure the request body for cleaner code
    const { firstName, lastName, email } = req.body;

    // Create an object with the fields to update
    const updatedFields = {
      firstName,
      lastName,
      email,
    };

    // Update the user document and return the updated user
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      updatedFields,
      { new: true }
    ).select("-password");

    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user data
    res.status(201).json({
      message: "Profile updated successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect", success: false });
    }
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { password: newPassword },
      { new: true }
    );
    res.status(201).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};



module.exports = {
  getUser,
  updateUser,
  updatePassword
};
