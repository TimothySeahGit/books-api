module.exports = {
  development: {
    username: "postgres",
    password: "jumpstart",
    database: "books-api",
    options: {
      dialect: "postgres"
    }
  },
  test: {
    username: "postgres",
    password: "",
    database: "books-api",
    options: {
      dialect: "sqlite",
      // storage: "../database",
      storage: ":memory:",
      logging: false
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    options: {
      dialect: "postgres"
    }
  }
};
