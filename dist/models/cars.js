"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cars = void 0;
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const carSize_1 = require("./carSize");
const users_1 = require("./users");
class cars extends sequelize_1.Model {
}
exports.cars = cars;
cars.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    size_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    rentPerDay: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    img_url: {
        type: sequelize_1.DataTypes.STRING,
    },
    isDeleted: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
    },
    deletedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: dbConnect_1.default,
});
cars.belongsTo(carSize_1.car_size, { foreignKey: "size_id" });
cars.belongsTo(users_1.users, { as: "createBy", foreignKey: "createdBy" });
cars.belongsTo(users_1.users, { as: "updateBy", foreignKey: "updatedBy" });
cars.belongsTo(users_1.users, { as: "deleteBy", foreignKey: "deletedBy" });
