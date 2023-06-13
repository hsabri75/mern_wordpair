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
exports.createWord = exports.getWords = void 0;
const wordModel_1 = __importDefault(require("../models/wordModel"));
const getWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bag_id } = req.body;
    if (req.user) {
        const words = yield wordModel_1.default.find({ bag_id });
        res.status(200).json(words);
    }
    else {
        res.status(400).json({ error: "User not logged in/ wordController" });
    }
});
exports.getWords = getWords;
const createWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bag_id, first, second } = req.body;
    let fillMsg = "";
    if (!bag_id) {
        fillMsg = fillMsg + "bag ";
    }
    if (!first) {
        fillMsg = fillMsg + "first ";
    }
    if (!second) {
        fillMsg = fillMsg + "second ";
    }
    if (fillMsg !== "") {
        return res.status(400).json({ error: "Please fill the fields: " + fillMsg });
    }
    try {
        if (req.user) {
            const word = yield wordModel_1.default.create({ first, second, bag_id });
            res.status(200).json(word);
        }
        else {
            res.status(400).json({ error: "User not logged in/ wordController" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("err1");
            res.status(400).json({ error: error.message });
        }
        else {
            console.log("uncaught error ", error);
        }
    }
});
exports.createWord = createWord;
