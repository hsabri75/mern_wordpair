"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const wordSchema = new Schema({
    first: {
        type: String,
        required: true,
    },
    second: {
        type: String,
        required: true,
    },
    bag_id: {
        type: String,
        required: true,
    },
});
wordSchema.index({ first: 1, bag_id: 1 }, { unique: true });
wordSchema.index({ second: 1, bag_id: 1 }, { unique: true });
exports.default = mongoose_1.default.model('Word', wordSchema);
