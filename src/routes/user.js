const express = require("express");
const { userAuth } = require("../middlewares/auth");
const CannotonnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

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
    const data = allaccepetedConnections.map((row)=> {
        if(row.fromUserId._id.toString() === loggedUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId
    });
  
    res.json({ data: data });
  } catch (error) {}
});
module.exports = userRouter;
