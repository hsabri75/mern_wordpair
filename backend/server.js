"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wordRoutes_js_1 = __importDefault(require("./routes/wordRoutes.js"));
const dotenv_1 = __importDefault(require("dotenv"));
var cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use('/api/words', wordRoutes_js_1.default);
app.get('/', (req, res) => {
    res.send('Hello TS ***');
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
