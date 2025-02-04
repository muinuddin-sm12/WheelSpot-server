"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewShcema = new mongoose_1.Schema({
    carName: { type: String, required: [true, 'Car name is required'] },
    review: { type: String, required: [true, 'Review is requied'] },
    image: { type: String, required: [true, 'Image is required'] },
    customerName: { type: String, required: [true, 'Customer name is required'] },
    date: { type: String },
});
exports.Review = (0, mongoose_1.model)('Review', reviewShcema);
