"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bagRoutes_js_1 = __importDefault(require("./routes/bagRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const wordRoutes_js_1 = __importDefault(require("./routes/wordRoutes.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
//import { _deleteAllWords } from './controllers/wordController.js';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//_deleteAllWords();
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body);
    next();
});
app.use('/api/user', userRoutes_js_1.default);
app.use('/api/bag', bagRoutes_js_1.default);
app.use('/api/word', wordRoutes_js_1.default);
const PORT = process.env.PORT;
mongoose_1.default.connect(process.env.MONG_URI)
    .then(() => {
    app.listen(PORT, () => {
        console.log("connected to db and listening on port ", PORT);
    });
})
    .catch((err) => { console.log(err); });
