const express = require("express");

const router = express.Router();

//controllers import
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

//middleware import
const { authCheck } = require("../middlewares/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);

module.exports = router;
