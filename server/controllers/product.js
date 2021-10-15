const Product = require("../models/product");
const slugify = require("slugify");

//creating the create method
exports.create = async (req, res) => {
  try {
    console.log("request", req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create Product Failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

//getting all products
exports.read = async (req, res) => {
  let products = await Product.find({});
  res(products);
  console.log(res);
};
