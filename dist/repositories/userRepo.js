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
const users_1 = require("../models/users");
class usersRepository {
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.users.create(Object.assign({}, body));
        });
    }
    getUsers(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.users.findAll({ where: { refresh_token: payload } });
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.users.findOne({ where: { email: email } });
        });
    }
    updateToken(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.users.update({
                refresh_token: payload,
            }, { where: { id: id } });
        });
    }
}
exports.default = usersRepository;
