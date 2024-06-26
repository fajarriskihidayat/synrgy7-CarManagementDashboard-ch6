import { Sequelize } from "sequelize";

const dotenv = require("dotenv");
dotenv.config();

const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
});

export default sequelize;
