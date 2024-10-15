const mongoose = require("mongoose");

const connectionRequestScheema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // this call the referance to the User collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestScheema.pre("save", function (next) {
  const connectionReq = this;
  // user is same as current user
  
  if (connectionReq.fromUserId.equals(connectionReq.toUserId)) {
    throw new Error("Cannot send connection request to your self ");
  }

  next()
});

const connectionRequest = new mongoose.model("connectionRequest", connectionRequestScheema);
module.exports = connectionRequest