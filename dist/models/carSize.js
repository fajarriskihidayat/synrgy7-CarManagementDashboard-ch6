"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.car_size = void 0;
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
class car_size extends sequelize_1.Model {
}
exports.car_size = car_size;
car_size.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    size: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: dbConnect_1.default,
});
