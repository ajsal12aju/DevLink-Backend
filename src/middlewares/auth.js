const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  // read the token from the req cookies
  // validate token
  // find the username

  try {
    const { token } = req.cookies;
    if(!token){
       return res.status(401).send("Please login")
    }
    const decodedData = await jwt.verify(token, "key134");

    const { _id } = decodedData;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user is not valie");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(403).send("user is not authanticated");
  }
};

module.exports = {
  userAuth,
};
