const express = require("express");
const authRouter = express.Router()
const User = require("../models/user");
const bcrypt = require("bcrypt");




authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password, "password");

    const user = await User.findOne({ email: email });
    console.log(password, "password");

    if (!user) {
      throw new Error("Email is not in the DB");
    }
    // const isPasswordValied = await bcrypt.compare(password, user.password);
    const isPasswordValied = await user.validatePassword(password);

    if (isPasswordValied) {
      const token = await user.getJwt();
      console.log(token, "--token--");
      res.cookie("token", token);
      res.send("user login succsesss");
    } else {
      throw new Error("password is not currectted");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("sonthig went wrong");
  }
});


authRouter.post("/signup", async (req, res) => {
  // creating new instance of user modal this will create new object for user using with User modal

  try {
    const user = req.body;

    if (!user) {
      throw new Error("data is not currected");
    }
    const password = user.password;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      password: hashPassword,
    });

    await newUser.save();
    res.send("User added succsussfully");
  } catch (error) {
    res.status(500).send("somthing went wrog : " + error.message);
  }
});

module.exports = {authRouter}