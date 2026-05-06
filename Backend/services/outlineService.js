const { askGemini } = require("./gemini");

async function generateOutline(book) {
  if (!book.notes_on_outline_before) return;

  const prompt = `
Create a structured book outline.

Title: ${book.title}
Notes: ${book.notes_on_outline_before}

Return ONLY JSON:
{
  "chapters": [
    { "title": "Chapter title" }
  ]
}
`;

  const response = await askGemini(prompt);

  let parsed;

  try {
    parsed = JSON.parse(response);
  } catch (err) {
    throw new Error("Invalid outline JSON from Gemini");
  }

  book.outline = parsed;
  book.status_outline_notes = "no";
  await book.save();

  console.log("Outline generated");
}

module.exports = { generateOutline };