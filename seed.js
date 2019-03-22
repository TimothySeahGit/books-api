const { Author, Book } = require("./models");

const createAuthorsAndBooks = async () => {
  //   await Author.create(
  //     {
  //       name: "George Orwell",
  //       books: [{ title: "animal farm" }, { title: "1984" }]
  //     },
  //     { include: [Book] }
  //   );
  await Book.create(
    { title: "animal farm", author: { name: "George Orwell" } },
    { include: [Author] }
  );
  await Author.create(
    {
      name: "Ray Bradbury",
      books: [{ title: "Farenheit 451" }]
    },
    { include: [Book] }
  );
};
//somehow create books and authors here

module.exports = createAuthorsAndBooks;
