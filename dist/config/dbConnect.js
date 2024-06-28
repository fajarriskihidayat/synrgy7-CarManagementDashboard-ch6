"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const dbUser = process.env.POSTGRES_USER_USER;
const dbPassword = process.env.POSTGRES_USER_PASSWORD;
const dbName = process.env.POSTGRES_USER_DATABASE;
const dbHost = process.env.POSTGRES_USER_HOST;
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "postgres",
    dialectModule: require("pg"),
    dialectOptions: { ssl: { require: true } },
});
exports.default = sequelize;
