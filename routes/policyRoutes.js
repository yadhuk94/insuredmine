const express = require("express");
const {
  getPolicyByEmail,
  getAggregatePolicy,
} = require("../controllers/policyController");

const router = express.Router();

router.route("/getPolicies").get(getPolicyByEmail);

router.route("/getAggregatePolicy").get(getAggregatePolicy);

module.exports = router;
