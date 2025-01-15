const CommentModel = require("../models/Comment");
const Quotes = require("../models/Quotes");
const mongoose = require("mongoose");

exports.addComment = async (req, res) => {
  try {
    const { _id, userId, userName, commentText } = req.body;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    if (!commentText || commentText.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const newComment = new CommentModel({
      userId: userObjectId,
      userName,
      comment: commentText,
      favoriCount: 0,
    });

    const savedComment = await newComment.save();

    const quote = await Quotes.findById(_id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.comments.push(savedComment._id);
    await quote.save();

    res.status(201).json({
      message: "Comment added successfully!",
      savedComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { quoteId, commentId } = req.body;

    const quote = await Quotes.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    const commentIndex = quote.comments.indexOf(commentId);
    if (commentIndex === -1) {
      return res
        .status(404)
        .json({ message: "Comment not found in this quote" });
    }

    quote.comments.splice(commentIndex, 1);
    await quote.save();

    await CommentModel.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { commentText, commentId } = req.body;

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!commentText || commentText.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    comment.comment = commentText;
    await comment.save();

    res.status(200).json({
      message: "Comment updated successfully!",
      updatedComment: comment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Error updating comment", error });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { commentId } = req.body;

    const comment = await CommentModel.findById(commentId);
    console.log("Received commentId:", commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      message: "Comment retrieved successfully!",
      comment,
    });
  } catch (error) {
    console.error("Error retrieving comment:", error);
    res.status(500).json({ message: "Error retrieving comment", error });
  }
};
