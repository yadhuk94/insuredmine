const mongoose = require("mongoose");

const policyCarrierSchema = new mongoose.Schema({
  companyName: { type: String, unique: true },
});

const PolicyCarrier = mongoose.model("PolicyCarrier", policyCarrierSchema);

module.exports = PolicyCarrier;
