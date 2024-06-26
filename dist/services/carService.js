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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _CarsService_carsRepository;
Object.defineProperty(exports, "__esModule", { value: true });
const carsRepo_1 = __importDefault(require("../repositories/carsRepo"));
class CarsService {
    constructor() {
        _CarsService_carsRepository.set(this, void 0);
        __classPrivateFieldSet(this, _CarsService_carsRepository, new carsRepo_1.default(), "f");
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _CarsService_carsRepository, "f").get();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _CarsService_carsRepository, "f").getById(id);
        });
    }
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _CarsService_carsRepository, "f").post(body);
        });
    }
    put(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _CarsService_carsRepository, "f").put(id, body);
        });
    }
    delete(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __classPrivateFieldGet(this, _CarsService_carsRepository, "f").delete(id, body);
        });
    }
}
_CarsService_carsRepository = new WeakMap();
exports.default = CarsService;
