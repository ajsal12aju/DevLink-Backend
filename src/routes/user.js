const express = require("express");
const { userAuth } = require("../middlewares/auth");
const CannotonnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();
const USER_SAVE_DATA = "firstName lastName photoUrl age gender about skills"
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const datas = await CannotonnectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.status(200).json({ data: datas, message: "Data Fetched successfully" });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const allaccepetedConnections = await CannotonnectionRequest.find({
      $or: [
        { fromUserId: loggedUser._id, status: "accepted" },
        { toUserId: loggedUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);
    const data = allaccepetedConnections.map((row) => {
      if (row.fromUserId._id.toString() === loggedUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data: data });
  } catch (error) {}
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // user should see the all the cards exept
    // his own card
    // ignord pepole
    // his connecitons
    // allready sent the connection requests

    const loggedUser = req.user;

    const allconnectionRequests = await CannotonnectionRequest.find({
      $or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
    }).select("fromUserId toUserId");

    const hideUsers = new Set(); // this will work like when we adding the datas in to the array this will ignore the repeated items
    allconnectionRequests.forEach((req) => {
      hideUsers.add(req.fromUserId.toString());
      hideUsers.add(req.toUserId.toString());
    });

    console.log(hideUsers)

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsers) } },
        { _id: { $ne: loggedUser._id } },
      ],
    }).select(USER_SAVE_DATA);
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = userRouter;
