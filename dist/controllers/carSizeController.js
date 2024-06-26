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
exports.deleteSize = exports.updateSize = exports.createSize = exports.getSizeById = exports.getSizes = void 0;
const carSizeService_1 = __importDefault(require("../services/carSizeService"));
const getSizes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sizes = yield new carSizeService_1.default().get();
        return res.status(200).json({
            message: "Get all sizes success",
            data: sizes,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getSizes = getSizes;
const getSizeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const size = yield new carSizeService_1.default().getById(id);
        if (!size)
            return res.status(404).json({ message: "Data null" });
        return res.status(200).json({
            message: "Get size by id success",
            data: size,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getSizeById = getSizeById;
const createSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (!payload.size)
        return res.status(400).json({ message: "Data not null" });
    try {
        const addSize = yield new carSizeService_1.default().post(payload);
        return res.status(200).json({
            message: "Create data success",
            data: addSize,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createSize = createSize;
const updateSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const payload = req.body;
    try {
        if (!payload.size)
            return res.status(400).json({ message: "Data not null" });
        const editSize = yield new carSizeService_1.default().put(id, payload);
        if (editSize[0] === 0)
            return res.status(404).json({ message: "Data not found" });
        return res.status(200).json({
            message: "Update data success",
            data: {
                updated: editSize[0],
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateSize = updateSize;
const deleteSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        if (!id)
            return res.status(400).json({ message: "Data not found" });
        const dropData = yield new carSizeService_1.default().delete(id);
        if (dropData === 0)
            return res.status(404).json({ message: "Data not found" });
        return res.status(200).json({
            message: "Delete data success",
            data: {
                deleted: dropData,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteSize = deleteSize;
