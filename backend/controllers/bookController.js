const UserFavoriteBooks = require("../models/UserFavoriteBooks");
const UserReadBooks = require("../models/UserReadBooks");
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

exports.addFavoriteBook = async (req, res) => {
  try {
    const { username, bookId, readDate } = req.body;
    let bookName = "Unknown Book";
    let bookAuthor = "Unknown Author";
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

    const newFavoriteBook = new UserFavoriteBooks({
      userFavId: `${username}_${bookId}`,
      username,
      bookId,
      bookName,
      bookAuthor,
      readDate,
      bookImage,
    });

    await newFavoriteBook.save();

    res.status(201).json({
      message: "Favorite book added successfully!",
      newFavoriteBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite book", error });
  }
};

exports.getFavoriteBooks = async (req, res) => {
  try {
    const { username } = req.params;

    const favoriteBooks = await UserFavoriteBooks.find({ username });
    res.status(200).json(favoriteBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorite books", error });
  }
};

exports.deleteFavoriteBook = async (req, res) => {
  try {
    const { userFavId } = req.params;

    const deletedFavoriteBook = await UserFavoriteBooks.findOneAndDelete({
      userFavId,
    });
    if (!deletedFavoriteBook) {
      return res.status(404).json({ message: "Favorite book not found!" });
    }

    res.status(200).json({
      message: "Favorite book successfully deleted!",
      deletedFavoriteBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting favorite book", error });
  }
};

exports.addReadBook = async (req, res) => {
  try {
    const { username, bookId, readDate, currentPage } = req.body;

    let bookName = "Unknown Book";
    let bookAuthor = "Unknown Author";
    let bookImage = "https://pngimg.com/uploads/book/book_PNG2111.png";
    let pages = 1000;
    const bookUrl = `https://api2.isbndb.com/book/${bookId}`;

    try {
      const bookData = await fetchFromAPI(bookUrl);
      bookName = bookData?.book?.title || bookName;
      bookImage = bookData?.book?.image || bookImage;
      authors = bookData?.book?.authors || ["Anonim", "Test"];
      pages = bookData?.book?.pages || pages;
      bookAuthor = authors.join("-");
    } catch (error) {
      console.warn(
        "Book name could not be fetched. Defaulting to 'Unknown Book'.",
        error.message
      );
    }

    const newReadBook = new UserReadBooks({
      userReadId: `${username}_${bookId}`,
      username,
      bookId,
      bookName,
      bookAuthor,
      readDate,
      bookImage,
      currentPage,
      pages,
      currentStatus: 0,
    });

    await newReadBook.save();

    res.status(201).json({
      message: "Read book added successfully!",
      newReadBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding read book", error });
  }
};

exports.getReadBooks = async (req, res) => {
  try {
    const { username } = req.params;

    const readBooks = await UserReadBooks.find({ username });
    res.status(200).json(readBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching read books", error });
  }
};

exports.deleteReadBook = async (req, res) => {
  try {
    const { userReadId } = req.params;

    const deletedReadBook = await UserReadBooks.findOneAndDelete({
      userReadId,
    });
    if (!deletedReadBook) {
      return res.status(404).json({ message: "Read book not found!" });
    }

    res.status(200).json({
      message: "Read book successfully deleted!",
      deletedReadBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting read book", error });
  }
};

exports.updateReadBook = async (req, res) => {
  try {
    const { currentPage, userReadId } = req.body;

    const updatedReadBook = await UserReadBooks.findOneAndUpdate(
      { userReadId },
      { currentPage },
      { new: true }
    );

    if (!updatedReadBook) {
      return res.status(404).json({ message: "Read book not found!" });
    }

    res.status(200).json({
      message: "Read book updated successfully!",
      updatedReadBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating read book", error });
  }
};
