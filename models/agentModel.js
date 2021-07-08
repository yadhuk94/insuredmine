const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  agentName: { type: String, unique: true },
});

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
