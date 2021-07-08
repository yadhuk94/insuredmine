const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  dob: { type: Date },
  address: { type: String },
  phone: { type: String },
  state: { type: String },
  zip: { type: String },
  email: { type: String, unique: true },
  gender: { type: String },
  userType: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
