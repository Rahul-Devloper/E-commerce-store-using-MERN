const express = require("express");

const router = express.Router();

//middleware import
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers import
const { create } = require("../controllers/product");

//routes
router.post("/product", authCheck, adminCheck, create);

module.exports = router;
