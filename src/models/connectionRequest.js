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

const connectionRequest = new mongoose.model("connectionRequest", connectionRequestScheema);
module.exports = connectionRequest