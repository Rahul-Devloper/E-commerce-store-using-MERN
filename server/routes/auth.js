const express = require("express");

const router = express.Router();

//import
const { createOrUpdateUser } = require("../controllers/auth");

//middleware import
const { authCheck } = require("../middlewares/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;
