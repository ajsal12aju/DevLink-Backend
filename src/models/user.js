const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userScheema = new mongoose.Schema(
  {
    firstName: {
      type: "String",
    },
    lastName: {
      type: "String",
    },
    email: {
      type: "String",
    },
    mobile: {
      type: "Number",
    },
    age: {
      type: "Number",
    },
    password: {
      type: "String",
    },
  },
  { timestamps: true }
);


userScheema.methods.getJwt = async function(){
  const user = this;

  const token = await jwt.sign({_id:user._id},"key134");
  return token
}

userScheema.methods.validatePassword = async function(userInPassword){
  const user = this.user;
  const passwordHash = user.password

  const isPasswordValid = await bcrypt.compare(userInPassword, passwordHash);
  return isPasswordValid
}

const User = mongoose.model("User", userScheema);
module.exports = User;
