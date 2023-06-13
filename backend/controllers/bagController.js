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
exports.createBag = exports.getAllBags = void 0;
const bagModel_1 = __importDefault(require("../models/bagModel"));
// get all wo
const getAllBags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user_id = req.user._id;
        const bags = yield bagModel_1.default.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(bags);
    }
    else {
        res.status(400).json({ error: "User not logged in/ wordController" });
    }
});
exports.getAllBags = getAllBags;
const createBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bagname } = req.body;
    if (!bagname) {
        return res.status(400).json({ error: "Please fill the bag name" });
    }
    try {
        if (req.user) {
            console.log({ req_user: req.user._id });
            const user_id = req.user._id;
            console.log({ bagname, user_id });
            const bag = yield bagModel_1.default.create({ bag: bagname, user_id });
            res.status(200).json(bag);
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
exports.createBag = createBag;
