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
exports.deleteWord = exports.createWords = exports.deleteBag = exports.createBag = exports.getBagsAndWords = void 0;
const wordModel_1 = __importDefault(require("../models/wordModel"));
const mongoose = require("mongoose");
const bagModel_1 = __importDefault(require("../models/bagModel"));
const checkUser = (res, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        res.status(400).json({ error: "User not logged in/ wordController" });
        return false;
    }
    return true;
});
const getBagsAndWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield checkUser(res, req.user)) {
        console.log({ user: req.user });
        const bags = yield bagModel_1.default.find({ user_id: req.user._id }).sort({ createdAt: -1 });
        const bagList = [];
        let totalwordCount = 0;
        for (let i = 0; i < bags.length; ++i) {
            console.log({ i, user: req.user, bag: bags[i].bag });
            const words = yield wordModel_1.default.find({ bag_id: bags[i]._id });
            const wordList = [];
            totalwordCount += words.length;
            for (let j = 0; j < words.length; ++j) {
                const { first, second, _id } = words[j];
                wordList.push({
                    first,
                    second,
                    _id: _id.toString()
                });
            }
            bagList.push({
                bag_id: bags[i]._id.toString(),
                bag: bags[i].bag,
                words: wordList
            });
        }
        console.log(`${bags.length} bags, ${totalwordCount} words sent as response`);
        res.status(200).json(bagList);
    }
});
exports.getBagsAndWords = getBagsAndWords;
const createBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield checkUser(res, req.user)) {
        const { bagname } = req.body;
        if (!bagname) {
            res.status(400).json({ error: "Please fill the bag name" });
        }
        try {
            const { _id } = yield bagModel_1.default.create({ bag: bagname, user_id: req.user._id });
            const resBag = { bag_id: _id.toString(), bag: bagname, words: [] };
            res.status(200).json(resBag);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: "Uncaught error" });
            }
        }
    }
});
exports.createBag = createBag;
const deleteBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield checkUser(res, req.user)) {
        const { bag_id } = req.body;
        if (!mongoose.Types.ObjectId.isValid(bag_id)) {
            return res.status(404).json({ error: "Not valid id" });
        }
        const bag = yield bagModel_1.default.findByIdAndDelete(bag_id);
        if (!bag) {
            return res.status(404).json({ error: "Id not found" });
        }
        res.status(200).json(bag);
    }
});
exports.deleteBag = deleteBag;
const deleteWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield checkUser(res, req.user)) {
        const { word_id } = req.body;
        if (!mongoose.Types.ObjectId.isValid(word_id)) {
            return res.status(404).json({ error: "Not valid id" });
        }
        const word = yield wordModel_1.default.findByIdAndDelete(word_id);
        console.log({ word });
        if (!word) {
            return res.status(404).json({ error: "Id not found" });
        }
        res.status(200).json(word);
    }
});
exports.deleteWord = deleteWord;
const checkBag = (res, bagWords) => __awaiter(void 0, void 0, void 0, function* () {
    let fillMsg = "";
    if (!bagWords.bag) {
        fillMsg = fillMsg + "bag ";
    }
    if (!bagWords.words) {
        fillMsg = fillMsg + "wordlist ";
    }
    if (fillMsg.length > 0) {
        res.status(400).json({ error: "Please fill the fields: " + fillMsg });
        return false;
    }
    return true;
});
const createWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bagWords = req.body;
    if ((yield checkBag(res, bagWords)) && (yield checkUser(res, req.user))) {
        const { bag_id } = bagWords;
        const ws = bagWords.words;
        const responseWords = [];
        for (let i = 0; i < ws.length; i++) {
            const { first, second } = ws[i];
            try {
                const word = yield wordModel_1.default.create({ first, second, bag_id });
                responseWords.push({ first, second, _id: word._id.toString() });
            }
            catch (error) {
                const msg = error instanceof Error ? { msg: error.message } : { msg: "uncaught error" };
                return res.status(400).send(msg);
            }
        }
        const bagwords = { bag_id, bag: bagWords.bag, words: responseWords };
        res.status(200).json({ msg: bagwords });
    }
});
exports.createWords = createWords;
