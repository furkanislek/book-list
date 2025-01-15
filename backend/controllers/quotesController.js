const Quotes = require("../models/Quotes");


exports.addQuote = async (req, res) => {
  try {
    const { title, userName, description, bookId, bookAuthor } = req.body;

    const newQuote = new Quotes({
      title,
      userName,
      description,
      bookId,
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
