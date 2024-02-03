const express = require("express");
const router = express.Router();
const User = require("../models/user");
module.exports = router;

router.get("/", (req, res) => {
    console.log("Request received on /admin");
});
