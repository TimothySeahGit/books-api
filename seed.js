const { Author, Book } = require("./models");

const createAuthorsAndBooks = async () => {
  await Author.create(
    {
      name: "George Orwell",
      books: [
        { title: "Animal Farm" },
        { title: "1984" },
        { title: "Homage to Catalonia" },
        { title: "The Road to Wigan Pier" }
      ]
    },
    { include: [Book] }
  );
  //   await Book.create(
  //     { title: "Animal Farm", author: { name: "George Orwell" } },
  //     { title: "1984", author: { name: "George Orwell" } },
  //     { title: "Homage to Catalonia", author: { name: "George Orwell" } },
  //     { title: "The Road to Wigan Pier", author: { name: "George Orwell" } },
  //     { title: "Brave New World", author: { name: "Aldous Huxley" } },

  //     { include: [Author] }
  //   );
  await Author.create(
    {
      name: "Ray Bradbury",
      books: [{ title: "Farenheit 451" }]
    },
    { include: [Book] }
  );
  await Author.create(
    {
      name: "Aldous Huxley",
      books: [{ title: "Brave New World" }]
    },
    { include: [Book] }
  );
};
//somehow create books and authors here

module.exports = createAuthorsAndBooks;
