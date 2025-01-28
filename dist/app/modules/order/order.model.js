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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const car_model_1 = require("../car/car.model");
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    carDetails: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    quantity: { type: String, required: true },
    totalPrice: { type: String, required: true },
    status: { type: Boolean, default: false }
}, {
    timestamps: true,
});
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const car = yield car_model_1.CarModel.findById(this.car);
        if (car) {
            car.quantity -= this.quantity;
            // Adjust stock status
            if (car.quantity === 0) {
                car.inStock = false;
            }
            else {
                car.inStock = true;
            }
            yield car.save();
        }
        next();
    });
});
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
