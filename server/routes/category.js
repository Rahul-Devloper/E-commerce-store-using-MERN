const express = require("express");

const router = express.Router();

//middleware import
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers import
const {
  create,
  read,
  update,
  remove,
  list,
  getSubCategories,
} = require("../controllers/category");

//routes
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);

//Getting Subcategory based on Parent Id in ProductCreateForm
router.get("/category/subCategories/:_id", getSubCategories);

module.exports = router;
