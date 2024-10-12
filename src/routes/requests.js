const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid status type" + status });
      }

      const toUserCheck = await User.findById(toUserId);
      if(toUserCheck){
        return res.status(400).json({
            message: "User is not found"
        })
      }
      
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            {fromUserId, toUserId},
            {fromUserId: toUserId, toUserId:fromUserId}
        ]
      });
      if(existingConnectionRequest){
        return res
          .status(400)
          .json({ message: "connection is allready exsited" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "connection request sent succsussfully",
        data,
      });
    } catch (error) {
      res.status(400).send("Error", +error.message);
    }
  }
);

module.exports = requestRouter;
