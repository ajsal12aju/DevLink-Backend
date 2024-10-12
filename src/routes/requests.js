const express = require("express");
const { userAuth } = require("../utils");
const ConnectionRequest = require("../models/connectionRequest");


const requsetRouter = express.Router();

requsetRouter.post("/request/send/intrested/:toUserId", userAuth, async (req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.toUserId;

        const connectionRequest = new connectionRequest({
          fromUserId,
          toUserId,
          status,
        });

        const data = await connectionRequest.save()

        res.json({
            message:'connection request sent succsussfully',
            data
        })
    } catch (error) {
        
    }
})

module.exports = requestRouter