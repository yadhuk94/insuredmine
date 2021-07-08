const mongoose = require("mongoose");

const userAccountSchema = new mongoose.Schema({
  accountName: { type: String, unique: true },
});

const UserAccount = mongoose.model("UserAccount", userAccountSchema);

module.exports = UserAccount;
