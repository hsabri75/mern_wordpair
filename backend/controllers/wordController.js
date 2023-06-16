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
exports.getBagsAndWords = exports.createWords = exports.createWord = exports.getWords = exports.createBag = exports._getBags = void 0;
const wordModel_1 = __importDefault(require("../models/wordModel"));
const bagModel_1 = __importDefault(require("../models/bagModel"));
// get all wo
const _getBags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user_id = req.user._id;
        const bags = yield bagModel_1.default.find({ user_id }).sort({ createdAt: -1 });
        console.log("get response: ", bags);
        res.status(200).json(bags);
    }
    else {
        res.status(400).json({ error: "User not logged in/ wordController" });
    }
});
exports._getBags = _getBags;
// get all wo
const getBagsAndWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user_id = req.user._id;
        const bags = yield bagModel_1.default.find({ user_id }).sort({ createdAt: -1 });
        const bl = [];
        let totalwordCount = 0;
        for (let i = 0; i < bags.length; ++i) {
            const bag = bags[i];
            const bag_id = bag._id;
            const words = yield wordModel_1.default.find({ bag_id });
            const ws = [];
            totalwordCount += words.length;
            for (let j = 0; j < words.length; ++j) {
                const word = words[j];
                const wp = { first: word.first, second: word.second, _id: word._id.toString() };
                ws.push(wp);
            }
            bl.push({
                bag_id: bag_id.toString(),
                bag: bag.bag,
                words: ws
            });
        }
        console.log(`${bags.length} bags, ${totalwordCount} words sent as response`);
        res.status(200).json(bl);
    }
    else {
        res.status(400).json({ error: "User not logged in/ wordController" });
    }
});
exports.getBagsAndWords = getBagsAndWords;
const _createBagFunction = (bagname, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bagname) {
        return { status: 400, msg: "Please fill the bag name" };
        //return res.status(400).json({ error: "Please fill the bag name" });
    }
    try {
        if (user) {
            const user_id = user._id;
            const bag = yield bagModel_1.default.create({ bag: bagname, user_id });
            return { status: 200, msg: bag._id.toString() };
            //res.status(200).json(bag);
        }
        else {
            return { status: 400, msg: "User not logged in/ wordController" };
            //res.status(400).json({error:"User not logged in/ wordController"})
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return { status: 400, msg: error.message };
            //res.status(400).json({error:error.message})
        }
        else {
            //console.log("uncaught error ", error)
            return { status: 400, msg: "Uncaught error" };
        }
    }
});
const createBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bagname } = req.body;
    const { status, msg } = yield _createBagFunction(bagname, req.user);
    res.status(status).json(msg);
});
exports.createBag = createBag;
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
const createWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bagname, wordlist, columnSeperator, rowSeperator } = req.body;
    let fillMsg = "";
    if (!bagname) {
        fillMsg = fillMsg + "bag ";
    }
    if (!wordlist) {
        fillMsg = fillMsg + "wordlist ";
    }
    const cSep = columnSeperator ? columnSeperator : "\t";
    const cRow = rowSeperator ? rowSeperator : "\n";
    if (fillMsg !== "") {
        return res.status(400).json({ error: "Please fill the fields: " + fillMsg });
    }
    try {
        if (req.user) {
            const { status: stBag, msg: msgBag } = yield _createBagFunction(bagname, req.user);
            if (stBag === 200) {
                const bag_id = msgBag;
                const ws = wordlist.split(rowSeperator);
                for (let i = 0; i < ws.length; i++) {
                    console.log({ wi: ws[i] });
                    const spl = ws[i].split(columnSeperator);
                    const first = spl[0];
                    const second = spl[1];
                    console.log({ f: first, s: second });
                    const { status: stWord, msg: msgWord } = yield _createWordFunction(bag_id, first, second, req.user);
                    console.log({ stWord, msgWord });
                    if (stWord === 400) {
                        res.status(stWord).json(msgWord);
                    }
                }
            }
            else {
                res.status(stBag).json(msgBag);
            }
            console.log("all finished");
            res.status(200).json({ msg: bagname });
        }
        else {
            res.status(400).json({ error: "User not logged in/ wordController" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            //console.log("err1")
            res.status(400).json({ error: error.message });
        }
        else {
            console.log("uncaught error ", error);
        }
    }
});
exports.createWords = createWords;
const _createWordFunction = (bag_id, first, second, user) => __awaiter(void 0, void 0, void 0, function* () {
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
        return { status: 400, msg: "Please fill the fields: " + fillMsg };
        //return res.status(400).json({ error: "Please fill the fields: "+fillMsg });
    }
    try {
        if (user) {
            const word = yield wordModel_1.default.create({ first, second, bag_id });
            return { status: 200, msg: word._id.toString() };
            //res.status(200).json(word);
        }
        else {
            return { status: 400, msg: "User not logged in/ wordController" };
            //res.status(400).json({error:"User not logged in/ wordController"})
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("err1");
            return { status: 400, msg: error.message };
            //res.status(400).json({error:error.message})
        }
        else {
            console.log("uncaught error ", error);
            return { status: 400, msg: "uncaught error" };
        }
    }
});
const createWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bag_id, first, second } = req.body;
    const { status, msg } = yield _createWordFunction(bag_id, first, second, req.user);
    res.status(status).json(msg);
});
exports.createWord = createWord;
