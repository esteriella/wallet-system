const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Your first name is required"],
    unique: false
  },
  lastName: {
    type: String,
    required: [true, "Your last name is required"],
    unique: false
  },
  phone: {
    type: Number,
    required: [true, "Your phone number is required"],
    unique: true
  },
  accountNumber: {
    type: String,
    required: [true, "Your account number is required"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
module.exports = mongoose.model("User", userSchema);
