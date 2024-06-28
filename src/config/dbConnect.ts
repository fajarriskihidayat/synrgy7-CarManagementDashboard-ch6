import { Sequelize } from "sequelize";

const dotenv = require("dotenv");
dotenv.config();

const dbUser = process.env.POSTGRES_USER_USER as string;
const dbPassword = process.env.POSTGRES_USER_PASSWORD;
const dbName = process.env.POSTGRES_USER_DATABASE as string;
const dbHost = process.env.POSTGRES_USER_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  dialectModule: require("pg"),
  dialectOptions: { ssl: { require: true } },
});

export default sequelize;
