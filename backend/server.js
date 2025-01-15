const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const quotesRoutes = require("./routes/quotesRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/quotes", quotesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
