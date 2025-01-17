const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true },
  publisher: String,
  publishDate: Date,
  coverImage: String,
  description: String,
  pageCount: Number
}); 