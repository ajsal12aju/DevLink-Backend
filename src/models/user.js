const mongoose = require("mongoose");

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

const User = mongoose.model("User", userScheema);
module.exports = User;
