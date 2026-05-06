const fs = require("fs/promises");
const path = require("path");
const Chapter = require("../models/Chapter");

async function compileBook(book) {

  const chapters = await Chapter.find({
    book_id: book._id
  }).sort({ chapter_number: 1 });

  let content = `# ${book.title}\n\n`;

  for (const ch of chapters) {
    content += `\n\n## Chapter ${ch.chapter_number}: ${ch.title}\n\n`;
    content += ch.content;
  }

  const filePath = path.join(
    __dirname,
    `../outputs/book-${book._id}.txt`
  );

  await fs.writeFile(filePath, content, "utf8");

  console.log("Book compiled:", filePath);

  return filePath;
}

module.exports = { compileBook };