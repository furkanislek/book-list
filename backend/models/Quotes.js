const mongoose = require("mongoose");
const Counter = require("./Counter");

const QuotesSchema = new mongoose.Schema(
  {
    quotesId: { type: String, required: false }, // quotesId'yi required: false yapıyoruz çünkü otomatik oluşturulacak
    title: { type: String, required: true },
    userName: { type: String, required: true },
    description: { type: String, required: true },
    favoriCount: { type: Number, required: true },
    bookId: { type: String, required: true },
    bookAuthor: { type: String, required: true },
  },
  { timestamps: true }
);

QuotesSchema.pre("save", async function (next) {
  const quote = this;

  // quotesId zaten varsa, bunu değiştirme
  if (quote.quotesId) {
    return next();
  }

  try {
    // Counter modelinden quotesId için seq numarasını alıyoruz
    const counter = await Counter.findByIdAndUpdate(
      { _id: "quotesId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // quotesId'yi userName ve counter.seq ile oluştur
    quote.quotesId = quote.userName + counter.seq;
    next();
  } catch (error) {
    return next(error); // Hata varsa, next() ile error'ı gönder
  }
});

module.exports = mongoose.model("Quotes", QuotesSchema);
