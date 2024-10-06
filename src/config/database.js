const mongoose = require("mongoose");

const connectDB = async ()=> {
  //     await mongoose.connect("mongodb://localhost:27017"); this diractly refering the clustor
  //     await mongoose.connect("mongodb://localhost:27017/DB name"); this diractly create new colletion
  await mongoose.connect(
    "mongodb+srv://ajsal12aju:ajsal12aju@devtinder.w2ckd.mongodb.net/devTinder"
  );
}

module.exports = connectDB

