const mongoose = require("mongoose");

const userFollowersSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    followDate: { type: Date, default: Date.now }, 
    userId: { type: String, required: true }, 
  },
  { timestamps: true }
);

const UserFollowers = mongoose.model("UserFollowers", userFollowersSchema);
module.exports = UserFollowers;
