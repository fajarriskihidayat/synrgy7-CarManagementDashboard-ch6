import { Sequelize } from "sequelize";

const dotenv = require("dotenv");
dotenv.config();

const dbUser = process.env.POSTGRES_USER as string;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DATABASE as string;
const dbHost = process.env.POSTGRES_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  dialectModule: require("pg"),
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

export default sequelize;
