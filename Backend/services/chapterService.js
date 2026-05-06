const Chapter = require("../models/Chapter");
const { askGemini } = require("./gemini");

async function generateChapter(book, chapterTitle, chapterNumber) {

  const previousChapters = await Chapter.find({
    book_id: book._id,
  }).sort({ chapter_number: 1 });

  const summaries = previousChapters
    .map(c => c.summary)
    .join("\n");

  const prompt = `
You are a professional book writer.

Book Title: ${book.title}

Previous Chapter Summaries:
${summaries || "None"}

Write Chapter ${chapterNumber}: ${chapterTitle}

Return ONLY JSON:
{
  "content": "...",
  "summary": "..."
}
`;

  const response = await askGemini(prompt);

  let parsed;

  try {
    parsed = JSON.parse(response);
  } catch (err) {
    throw new Error("Invalid chapter JSON from Gemini");
  }

  await Chapter.create({
    book_id: book._id,
    chapter_number: chapterNumber,
    title: chapterTitle,
    content: parsed.content,
    summary: parsed.summary,
    chapter_notes_status: "no_notes_needed"
  });

  console.log(`Chapter ${chapterNumber} generated`);
}

module.exports = { generateChapter };