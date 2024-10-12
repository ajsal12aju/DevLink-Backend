const mongoose = require("mongoose");

const connectionRequestScheema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepeted", "rejected"],
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