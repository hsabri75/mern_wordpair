"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { WordPair } from '../models/WordPair';
const wordController_1 = require("../controllers/wordController");
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const router = express_1.default.Router();
router.use(requireAuth_1.default);
router.get('/', wordController_1.getBags);
router.post("/", wordController_1.createBag);
exports.default = router;
