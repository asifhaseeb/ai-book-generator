require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/books");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post("/book", async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

app.listen(3000, () => console.log("Server running"));