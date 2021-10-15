const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
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
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};
exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true } //Is mandatory while updating an existing one
    );
    res.json(updated);
  } catch (err) {
    console.log(req.body);
    res.status(400).send("Create Update Failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Create Delete Failed");
  }
};

//Finding the subcategory that has the id of the parent category
//Eg. if the selected category has an id of 2, then all subcategories
//that has the key parent and value of the id 2, will be found
//from the backend
exports.getSubCategories = (req, res) => {
  SubCategory.find({ parent: req.params._id }).exec((err, subCategories) => {
    if (err) console.log(err);
    res.json(subCategories);
  });
};
