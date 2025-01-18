const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const quotesRoutes = require("./routes/quotesRoutes");
const bookApiRoutes = require("./api/bookApi");
const commentsRoutes = require("./routes/commentsRoutes");
dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/userbook", bookRoutes);
app.use("/api/quotes", quotesRoutes);
app.use("/api/book", bookApiRoutes);
app.use("/api/comments", commentsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
