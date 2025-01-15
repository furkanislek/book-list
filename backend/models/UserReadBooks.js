const mongoose = require("mongoose");

const userReadBooksSchema = new mongoose.Schema(
  {
    userReadId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    bookId: { type: String, required: true },
    bookName: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    readDate: { type: Date, required: true },
    bookImage: { type: String, required: true },
    currentPage: {type:Number, required:true}
  },
  { timestamps: true }
);

const UserReadBooks = mongoose.model("UserReadBooks", userReadBooksSchema);
module.exports = UserReadBooks;
