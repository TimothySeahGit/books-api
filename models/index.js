const Sequelize = require("sequelize");

//create the connection between books and author by creating a Sequelize instance
const sequelize = new Sequelize("books-api", "postgres", "jumpstart", {
  dialect: "postgres"
});

//pass the models to that connection
const models = {
  Book: sequelize.import("./Book"),
  Author: sequelize.import("./Author")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

//link up all models
module.exports = { sequelize, ...models };
