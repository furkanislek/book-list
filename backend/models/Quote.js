const quoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  content: { type: String, required: true },
  page: Number,
  createdAt: { type: Date, default: Date.now }
}); 