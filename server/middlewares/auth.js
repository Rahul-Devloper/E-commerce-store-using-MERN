const admin = require("../firebase");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); //token

  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("firebaseUser in auth check", firebaseUser);
    req.user = firebaseUser; //assigning the value of firebaseUser to req.user
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};
