const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const fetchFromAPI = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: process.env.API_KEY,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from API.");
  }
};

router.get("/search/:name", async (req, res) => {
  const { name, page, pageSize, column, shouldMarchAll, language } = req.params;
  const searchUrl = `https://api2.isbndb.com/books/${name}?page=${page}?pageSize=${pageSize}?column=${column}?shouldMarchAll=${shouldMarchAll}?language=${language}`;

  try {
    const data = await fetchFromAPI(searchUrl);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search/author/:name", async (req, res) => {
  const { name, page, pageSize, language } = req.params;
  const searchUrl = `https://api2.isbndb.com/author/${name}?page=${page}?pageSize=${pageSize}?language=${language}`;

  try {
    const data = await fetchFromAPI(searchUrl);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const searchUrl = `https://api2.isbndb.com/author/${bookId}`;

  try {
    const data = await fetchFromAPI(searchUrl);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
