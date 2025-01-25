const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const validator = require("validator")


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
    photoUrl: {
      type: "String",
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (
          !validator.isURL(value, {
            protocols: ["http", "https"],
            require_protocol: true,
          })
        ) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },

    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);


userScheema.methods.getJwt = async function(){
  const user = this;
  console.log(user, "==user==");

  const token = await jwt.sign({_id:user._id},"key134");
  return token
}

userScheema.methods.validatePassword = async function(userInPassword){
  const passwordHash = this.password;

  const isPasswordValid = await bcrypt.compare(userInPassword, passwordHash);
  return isPasswordValid
}

const User = mongoose.model("User", userScheema);
module.exports = User;
