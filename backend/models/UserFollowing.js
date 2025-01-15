const mongoose = require("mongoose");

const userFollowingSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    followDate: { type: Date, default: Date.now }, 
    userId: { type: String, required: true }, 
  },
  { timestamps: true }
);

const UserFollowing = mongoose.model("UserFollowing", userFollowingSchema);
module.exports = UserFollowing;
