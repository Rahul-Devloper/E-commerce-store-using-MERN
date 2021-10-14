const express = require("express");

const router = express.Router();

//middleware import
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers import
const { create, read } = require("../controllers/product");

//routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products", read);

module.exports = router;
