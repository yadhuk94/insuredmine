const express = require("express");
const { uploadFile } = require("../controllers/dataController");

const router = express.Router();

router.route("/upload").post(uploadFile);

module.exports = router;
