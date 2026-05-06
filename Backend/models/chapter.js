const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  book_id: mongoose.Schema.Types.ObjectId,
  chapter_number: Number,
  title: String,
  content: String,
  summary: String,
  chapter_notes: String,
  chapter_notes_status: String
}, { timestamps: true });

module.exports = mongoose.model("Chapter", chapterSchema);