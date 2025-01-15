const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentController");

router.post("/add", commentsController.addComment);

router.delete("/delete", commentsController.deleteComment);

router.put("/update", commentsController.updateComment);

router.get("/getById", commentsController.getCommentById);

module.exports = router;
