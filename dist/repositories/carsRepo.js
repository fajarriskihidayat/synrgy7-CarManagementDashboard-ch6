"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cars_1 = require("../models/cars");
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
class carsRepository {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_1.cars.findAll({
                attributes: {
                    include: [[dbConnect_1.default.col("car_size.size"), "size"]],
                    exclude: ["size_id", "createdBy", "updatedBy", "deletedBy"],
                },
                include: [
                    {
                        association: "car_size",
                        attributes: [],
                    },
                    {
                        association: "createBy",
                        attributes: ["id", "name", "email", "role"],
                    },
                    {
                        association: "updateBy",
                        attributes: ["id", "name", "email", "role"],
                    },
                    {
                        association: "deleteBy",
                        attributes: ["id", "name", "email", "role"],
                    },
                ],
                order: [["id", "ASC"]],
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_1.cars.findOne({
                where: { id: id },
                attributes: {
                    include: [[dbConnect_1.default.col("car_size.size"), "size"]],
                    exclude: ["size_id", "createdBy", "updatedBy", "deletedBy"],
                },
                include: [
                    {
                        association: "car_size",
                        attributes: ["id", "size"],
                    },
                    {
                        association: "createBy",
                        attributes: ["id", "name", "email", "role"],
                    },
                    {
                        association: "updateBy",
                        attributes: ["id", "name", "email", "role"],
                    },
                    {
                        association: "deleteBy",
                        attributes: ["id", "name", "email", "role"],
                    },
                ],
            });
        });
    }
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_1.cars.create(Object.assign({}, body));
        });
    }
    put(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_1.cars.update(Object.assign({}, body), { where: { id: id } });
        });
    }
    delete(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_1.cars.update(Object.assign({}, body), { where: { id: id } });
        });
    }
}
exports.default = carsRepository;
