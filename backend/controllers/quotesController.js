const Quotes = require("../models/Quotes");
const dotenv = require("dotenv");
const axios = require("axios");

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

exports.addQuote = async (req, res) => {
  try {
    const { title, userName, description, bookId } = req.body;
    let bookName = "Unknown Book";
    let bookImage = "https://pngimg.com/uploads/book/book_PNG2111.png";
    const bookUrl = `https://api2.isbndb.com/book/${bookId}`;

    try {
      const bookData = await fetchFromAPI(bookUrl);
      bookName = bookData?.book?.title || bookName;
      bookImage = bookData?.book?.image || bookImage;
      authors = bookData?.book?.authors || ["Anonim", "Test"];
      bookAuthor = authors.join("-");
    } catch (error) {
      console.warn(
        "Book name could not be fetched. Defaulting to 'Unknown Book'.",
        error.message
      );
    }

    const newQuote = new Quotes({
      title,
      userName,
      description,
      bookId,
      bookAuthor,
      bookName,
      bookImage,
      bookAuthor,
      favoriCount: 0,
    });

    await newQuote.save();

    res.status(201).json({
      message: "Quote added successfully!",
      newQuote,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding quote", error });
  }
};

exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quotes.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotes", error });
  }
};

exports.getUserQuotes = async (req, res) => {
  try {
    const { userName } = req.params;

    const userQuotes = await Quotes.find({ userName });
    res.status(200).json(userQuotes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user quotes", error });
  }
};

exports.updateQuote = async (req, res) => {
  try {
    const { title, description, bookId, bookAuthor, favoriCount, quotesId } =
      req.body;

    const updatedQuote = await Quotes.findOneAndUpdate(
      { quotesId },
      { title, description, bookId, bookAuthor, favoriCount },
      { new: true }
    );

    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found!" });
    }

    res.status(200).json({
      message: "Quote updated successfully!",
      updatedQuote,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating quote", error });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    const { quotesId } = req.params;

    const deletedQuote = await Quotes.findOneAndDelete({ quotesId });
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found!" });
    }

    res.status(200).json({
      message: "Quote deleted successfully!",
      deletedQuote,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quote", error });
  }
};
