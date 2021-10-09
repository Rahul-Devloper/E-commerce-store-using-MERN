const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({
    //   name: name,
    //   slug: slugify(name),
    // }).save();
    res.json(
      await new Category({
        name: name,
        slug: slugify(name),
      }).save()
    );
  } catch (err) {
    console.log(req.body);
    res.status(400).send("Create Category Failed");
  }
};
exports.list = async (req, res) => {
  //
};
exports.read = async (req, res) => {
  //
};
exports.update = async (req, res) => {
  //
};
exports.remove = async (req, res) => {
  //
};
