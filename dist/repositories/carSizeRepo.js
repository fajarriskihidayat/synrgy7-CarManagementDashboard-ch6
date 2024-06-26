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
Object.defineProperty(exports, "__esModule", { value: true });
const carSize_1 = require("../models/carSize");
class carSizeRepository {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carSize_1.car_size.findAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carSize_1.car_size.findOne({ where: { id: id } });
        });
    }
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carSize_1.car_size.create(Object.assign(Object.assign({}, body), { size: body.size.toLowerCase() }));
        });
    }
    put(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carSize_1.car_size.update(Object.assign(Object.assign({}, body), { size: body.size.toLowerCase() }), { where: { id: id } });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carSize_1.car_size.destroy({ where: { id: id } });
        });
    }
}
exports.default = carSizeRepository;
