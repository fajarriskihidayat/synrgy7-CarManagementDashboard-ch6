"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const sequelize = new sequelize_1.Sequelize({
    database: dbName,
    username: dbUser,
    password: dbPassword,
    host: dbHost,
    dialect: "postgres",
    dialectModule: require("pg"),
    benchmark: true,
});
exports.default = sequelize;
