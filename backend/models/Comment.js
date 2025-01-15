const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
    favoriCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
