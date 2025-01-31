const mongoose = require("mongoose");
const Counter = require("./Counter");

const UserSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true }, 
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    favoriteBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    readingList: [{
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      currentPage: Number,
      totalPages: Number,
      startDate: Date,
      finishDate: Date,
      status: { type: String, enum: ['reading', 'completed', 'want-to-read'] }
    }]
  },
  { timestamps: true } 
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.userId) {
    return next();
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "userId" },
      { $inc: { seq: 1 } }, 
      { new: true, upsert: true }
    );

    user.userId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
