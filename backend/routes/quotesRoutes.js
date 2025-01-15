const express = require("express");
const {
  addQuote,
  deleteQuote,
  getAllQuotes,
  getUserQuotes,
  updateQuote,
} = require("../controllers/quotesController");

const router = express.Router();

router.post("/add", addQuote);

router.get("/", getAllQuotes);

router.get("/:userName", getUserQuotes);

router.delete("/:quotesId", deleteQuote);

router.put("/update", updateQuote);

module.exports = router;
