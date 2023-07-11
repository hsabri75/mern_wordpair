"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bagSchema = new Schema({
    bagname: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
});
bagSchema.index({ bagname: 1, user_id: 1 }, { unique: true });
exports.default = mongoose_1.default.model('Bag', bagSchema);
