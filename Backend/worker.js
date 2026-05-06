require("dotenv").config();
const mongoose = require("mongoose");

const Book = require("./models/books");
const Chapter = require("./models/Chapter");

const { generateOutline } = require("./services/outlineService");
const { generateChapter } = require("./services/chapterService");
const { compileBook } = require("./services/compileService");
const { sendEmail } = require("./services/notifyService");

mongoose.connect(process.env.MONGO_URI);

async function run() {
  const books = await Book.find({
    book_output_status: { $ne: "completed" }
  });

  for (let book of books) {

    try {

      if (book.is_processing) continue;

      book.is_processing = true;
      await book.save();

      console.log("📘 Processing:", book.title);
      if (!book.outline) {

        console.log("✏️ Generating outline...");

        await generateOutline(book);

        await sendEmail(
          "📘 Outline Ready",
          `Book: ${book.title}\nOutline generated successfully.`
        );

        book.is_processing = false;
        await book.save();
        continue;
      }
      const chapters = book.outline.chapters || [];

      for (let i = 0; i < chapters.length; i++) {

        const exists = await Chapter.findOne({
          book_id: book._id,
          chapter_number: i + 1
        });

        if (!exists) {
          await generateChapter(
            book,
            chapters[i].title,
            i + 1
          );

          await sendEmail(
            "✍️ Chapter Generated",
            `Book: ${book.title}\nChapter ${i + 1} done.`
          );

          book.is_processing = false;
          await book.save();
          return;
        }
      }
      if (book.final_review_notes_status === "no_notes_needed") {

        console.log("📦 Compiling book...");

        await compileBook(book);

        book.book_output_status = "completed";

        await sendEmail(
          "📦 Book Completed",
          `Your book "${book.title}" is ready.`
        );
      }

      book.is_processing = false;
      await book.save();

    } catch (err) {

      console.log("❌ Worker error:", err.message);

      book.is_processing = false;
      await book.save();

      await sendEmail(
        "❌ Worker Error",
        `Book: ${book.title}\nError: ${err.message}`
      );
    }
  }
}

setInterval(() => {
  run().catch(console.error);
}, 5000);