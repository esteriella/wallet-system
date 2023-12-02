const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  bvn: {
    type: Number,
    unique: true
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
