const express = require('express');

const router = express.Router();


router.use("/user", require('./user'));
router.use("/profile",require('./profile'));
router.use("/account", require("./account"));
router.use("/me",require("./me"));




module.exports = router; 