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
    );

    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user data
    res.status(200).json(user);
  } catch (error) {
    // Handle any errors that occur during the update
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Update the user's password and return the updated user
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with a success message
    res.status(201).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    // Handle any errors that occur during password update
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  getUser,
  updateUser,
  updatePassword
};
