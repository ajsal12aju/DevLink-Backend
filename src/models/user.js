const mongoose = require("mongoose");

const userScheema = new mongoose.Schema({
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
});

const User = mongoose.model("User", userScheema);
module.exports = User;
