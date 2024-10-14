const express =  require("express");
const { userAuth } = require("../middlewares/auth");
const CannotonnectionRequest = require("../models/connectionRequest");



const userRouter = express.Router();

userRouter.get("/user/requests/recieved", userAuth, async (req,res)=>{
    try {
        const loggedUser = req.user;

      const datas = await CannotonnectionRequest.find({
        toUserId: loggedUser._id,
        status: "interested",
      });

      res.status(200).json({data:datas, message:"Data Fetched successfully"});
    } catch (error) {
        res.status(400).send("ERROR:" + error.message)
    }
})

module.exports = userRouter