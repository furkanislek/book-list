
const mongoose = require("mongoose");

const userFavoriteBooksSchema = new mongoose.Schema(
  {
    userFavId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    bookId: { type: String, required: true },
    bookName: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    readDate: { type: Date, required: true }, // Kitap okunma tarihi
    bookImage: { type: String, required: true },
  },
  { timestamps: true }
);

const UserFavoriteBooks = mongoose.model(
  "UserFavoriteBooks",
  userFavoriteBooksSchema
);
module.exports = UserFavoriteBooks;
