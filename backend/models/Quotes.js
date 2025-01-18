const mongoose = require("mongoose");
const Counter = require("./Counter");
const Comment = require("./Comment");

const QuotesSchema = new mongoose.Schema(
  {
    quotesId: { type: String, required: false },
    title: { type: String, required: true },
    userName: { type: String, required: true },
    description: { type: String, required: true },
    favoriCount: { type: Number, required: true },
    bookId: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    bookName: { type: String, required: false },
    bookImage: { type: String, required: false },
    bookAuthor: { type: String, required: false },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

QuotesSchema.pre("save", async function (next) {
  const quote = this;

  if (quote.quotesId) {
    return next();
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "quotesId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    quote.quotesId = quote.userName + counter.seq;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("Quotes", QuotesSchema);
