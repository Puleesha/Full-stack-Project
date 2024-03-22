"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    industry: String,
    orders: [
        {
            descripion: String,
            amountInCents: Number
        }
    ]
});
exports.Customer = (0, mongoose_1.model)('Customer', customerSchema);
