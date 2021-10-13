const SubCategory = require("../models/subCategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(
      await new SubCategory({
        name: name,
        parent: parent,
        slug: slugify(name),
      }).save()
    );
  } catch (err) {
    console.log("Sub Category Error=>", err);
    res.status(400).send("Create SubCategory Failed");
  }
};
exports.list = async (req, res) => {
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());
};
exports.read = async (req, res) => {
  let subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();
  res.json(subCategory);
};
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true } //Is mandatory while updating an existing one
    );
    res.json(updated);
  } catch (err) {
    console.log(req.body);
    res.status(400).send("SubCategory Update Failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("SubCategory Delete Failed");
  }
};
