const express = require("express");
const router = express.Router();

// @route  GET /node
// @desc   Test character route
// @access Public
router.get("/", (req, res) => res.json({ msg: "Fight Works" }));

module.exports = router;