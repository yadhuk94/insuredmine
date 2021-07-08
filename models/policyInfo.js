const mongoose = require("mongoose");

const policyInfoSchema = new mongoose.Schema({
  policyNumber: { type: String, unique: true },
  policyStartDate: { type: Date },
  policyEndDate: { type: Date },
  policyCategory: { type: String },
  company: { type: mongoose.Schema.ObjectId, ref: "PolicyCarrier" },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const PolicyInfo = mongoose.model("PolicyInfo", policyInfoSchema);

module.exports = PolicyInfo;
