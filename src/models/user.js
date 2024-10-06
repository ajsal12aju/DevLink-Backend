import mongoose from 'mongoose';

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

const UserModal = mongoose.model("User", userScheema);
module.exports = UserModal