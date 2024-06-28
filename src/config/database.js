const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER_USER,
    password: process.env.POSTGRES_USER_PASSWORD,
    database: process.env.POSTGRES_USER_DATABASE,
    host: process.env.POSTGRES_USER_HOST,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true } },
  },
  test: {
    username: process.env.POSTGRES_USER_USER,
    password: process.env.POSTGRES_USER_PASSWORD,
    database: process.env.POSTGRES_USER_DATABASE,
    host: process.env.POSTGRES_USER_HOST,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true } },
  },
  production: {
    username: process.env.POSTGRES_USER_USER,
    password: process.env.POSTGRES_USER_PASSWORD,
    database: process.env.POSTGRES_USER_DATABASE,
    host: process.env.POSTGRES_USER_HOST,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true } },
  },
};
