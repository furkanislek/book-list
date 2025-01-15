const express = require("express");
const router = express.Router();
const userFavoriteBooksController = require("../controllers/bookController");

router.post("/favori/add", userFavoriteBooksController.addFavoriteBook);

router.get("/favori/:username", userFavoriteBooksController.getFavoriteBooks);

router.delete(
  "/favori/:userFavId",
  userFavoriteBooksController.deleteFavoriteBook
);

router.post("/reading/add", userFavoriteBooksController.addReadBook);

router.get("/reading/:username", userFavoriteBooksController.getReadBooks);

router.delete(
  "/reading/:userReadId",
  userFavoriteBooksController.deleteReadBook
);

router.put("/reading/update", userFavoriteBooksController.updateReadBook);

module.exports = router;
