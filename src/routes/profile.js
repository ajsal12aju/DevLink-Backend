const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { userProfileEditValidte } = require("../utils");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("somthing went wrong" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!userProfileEditValidte(req)) {
      throw new Error("Invalid feilds");
    }
    const loggedUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
    await loggedUser.save();

    res.status(200).send("edit is done");
  } catch (error) {
    res.status(400).send("ERR:" + error.message);
  }
});

profileRouter.patch("/profile/forget", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const givenPassword = req.body;

    Object.keys(req.body).forEach(
      (key) => (loggedUser[key] = givenPassword[key])
    );

    await loggedUser.save();

    res.status(200).send("edit is done");
  } catch (error) {
    throw new Error("the user is not allow");
  }
});

module.exports = {
  profileRouter,
};
