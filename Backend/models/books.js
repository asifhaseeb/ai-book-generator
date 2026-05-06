const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  notes_on_outline_before: String,
  outline: Object,
  notes_on_outline_after: String,
  status_outline_notes: String,
  final_review_notes_status: String,
  book_output_status: String
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);