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
exports.deleteCar = exports.updateCar = exports.createCar = exports.getCarsById = exports.getCars = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const carService_1 = __importDefault(require("../services/carService"));
const imageName_1 = require("../utils/imageName");
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield new carService_1.default().get();
        const filteredCar = cars.filter((car) => car.isDeleted !== 1);
        return res.status(200).json({
            message: "Get all cars success",
            data: filteredCar,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getCars = getCars;
const getCarsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const cars = yield new carService_1.default().getById(id);
        if (!cars)
            return res.status(404).json({ message: "Data not found" });
        return res.status(200).json({
            message: "Get cars by id success",
            data: cars,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getCarsById = getCarsById;
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const image = req.file;
    if (!payload.size_id || !payload.name || !payload.rentPerDay) {
        return res.status(400).json({ message: "Data not null" });
    }
    const filebase64 = image.buffer.toString("base64");
    const file = `data:${image.mimetype};base64,${filebase64}`;
    const img = yield cloudinary_1.default.uploader.upload(file, { folder: "bcr-ch6" });
    const userAuth = req.user;
    try {
        const body = Object.assign(Object.assign({}, payload), { img_url: img.url, createdBy: userAuth.id });
        const addCar = yield new carService_1.default().post(body);
        return res.status(200).json({
            message: "Created car success",
            data: addCar,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createCar = createCar;
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const payload = req.body;
    const img_url = req.file;
    if (!payload.size_id || !payload.name || !payload.rentPerDay) {
        return res.status(400).json({ message: "Data not null" });
    }
    let imgUrl;
    if (img_url) {
        const filebase64 = img_url === null || img_url === void 0 ? void 0 : img_url.buffer.toString("base64");
        const file = `data:${img_url === null || img_url === void 0 ? void 0 : img_url.mimetype};base64,${filebase64}`;
        const img = yield cloudinary_1.default.uploader.upload(file, { folder: "bcr-ch6" });
        imgUrl = img === null || img === void 0 ? void 0 : img.url;
    }
    const car = yield new carService_1.default().getById(id);
    if (!car || car.isDeleted === 1) {
        return res.status(404).json({ message: "Data not found" });
    }
    const fileName = (0, imageName_1.imageName)(car === null || car === void 0 ? void 0 : car.img_url);
    const userAuth = req.user;
    try {
        const body = Object.assign(Object.assign({}, payload), { img_url: imgUrl, updatedBy: userAuth.id, updatedAt: new Date() });
        const editCar = yield new carService_1.default().put(id, body);
        if (imgUrl) {
            yield cloudinary_1.default.uploader.destroy(fileName, (err) => {
                if (!!err) {
                    return res.status(400).json({ message: "Upload image failed" });
                }
            });
        }
        return res.status(200).json({
            message: "Updated car success",
            data: {
                updated: editCar[0],
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateCar = updateCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const car = yield new carService_1.default().getById(id);
    if (!car || car.isDeleted === 1) {
        return res.status(404).json({ message: "Data not found" });
    }
    const fileName = (0, imageName_1.imageName)(car === null || car === void 0 ? void 0 : car.img_url);
    const userAuth = req.user;
    try {
        const body = Object.assign(Object.assign({}, car), { isDeleted: 1, deletedBy: userAuth.id });
        const destroyCar = yield new carService_1.default().delete(id, body);
        yield cloudinary_1.default.uploader.destroy(fileName, (err) => {
            if (!!err) {
                return res.status(400).json({ message: "Upload image failed" });
            }
        });
        return res.status(200).json({
            message: "Deleted car success",
            data: {
                deleted: destroyCar[0],
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteCar = deleteCar;
