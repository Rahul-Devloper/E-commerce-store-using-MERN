const User = require("../models/user");

//create or updating a user function

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  //finding whether the user exists in the database or not
  const user = await User.findOneAndUpdate(
    { email: email },
    { name: email.split("@")[0], picture: picture },
    { new: true }
  );

  if (user) {
    console.log("user updated", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email: email,
      name: email.split("@")[0],
      picture: picture,
    }).save();
    console.log("user created", newUser);
    res.json(newUser);
  }
};

//creating a current user function
exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
