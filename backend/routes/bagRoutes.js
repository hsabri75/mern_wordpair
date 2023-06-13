"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { WordPair } from '../models/WordPair';
const bagController_1 = require("../controllers/bagController");
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const router = express_1.default.Router();
router.use(requireAuth_1.default);
router.get('/', bagController_1.getAllBags);
router.post("/", bagController_1.createBag);
exports.default = router;
