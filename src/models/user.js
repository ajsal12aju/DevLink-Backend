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

const User = mongoose.model("User", userScheema);
module.exports = User;
