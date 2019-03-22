const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
let sequelize;
//Connect to different database depending on env
if (env === "production") {
  sequelize = new Sequelize(config.url, config.options);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
  );
}

//create the connection between books and author by creating a Sequelize instance
// const sequelize = new Sequelize("books-api", "postgres", "jumpstart", {
//   dialect: "postgres"
// });

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
