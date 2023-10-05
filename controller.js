const path = require("path");
const fs = require("fs");

const booksPath = path.join(__dirname, "books.json");

function readBooksData() {
  try {
    const rawData = fs.readFileSync(booksPath, "utf8");
    const booksData = JSON.parse(rawData);
    if (Array.isArray(booksData.books)) {
      return booksData;
    } else {
      console.error("Invalid 'books' data structure:", booksData);
      return [];
    }
  } catch (error) {
    console.error("Error reading 'books' data:", error);
    return [];
  }
}

exports.getBooks = (req, res) => {
  const booksData = readBooksData();
  if (Array.isArray(booksData.books)) {
    res.render("bookslist", { books: booksData.books });
  } else {
    console.error("Invalid or missing 'books' data.");
  }
};

exports.getBookById = (req, res) => {
  const booksData = readBooksData();
  const bookId = parseInt(req.params.id);
  const book = booksData.books.find((book) => book.id === bookId);
  console.log(book);

  if (book) {
    res.render("bookdetails", { book });
  } else {
    res.status(404).send("Book not found");
  }
};
exports.createBook = (req, res) => {
  const { title, author, publicationYear, isbn, genre } = req.body;

  const booksData = readBooksData();

  const maxExistingId = booksData.books.reduce((maxId, book) => {
    return book.id > maxId ? book.id : maxId;
  }, 0);

  const bookId = maxExistingId + 1;

  const newBook = {
    id: bookId,
    title,
    author,
    publicationYear: parseInt(publicationYear),
    isbn,
    genre,
  };

  booksData.books.push(newBook);

  fs.writeFileSync(booksPath, JSON.stringify(booksData, null, 2), "utf8");

  res.redirect("/books");
};
