const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  //finding whether the user exists in the database or not
  const user = await User.findOneAndUpdate(
    { email: email },
    { name: name, picture: picture },
    { new: true }
  );

  if (user) {
    console.log("user updated", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email: email,
      name: name,
      picture: picture,
    }).save();
    console.log("user created", newUser);
    res.json(newUser);
  }
};
