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
    email: { type: String, required: true },
    car: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const car = yield car_model_1.CarModel.findById(this.car);
        if (!car) {
            throw new Error('Car not found');
        }
        if (car.quantity < this.quantity) {
            throw new Error('Insufficient stock');
        }
        car.quantity -= this.quantity;
        // Adjust stock status
        if (car.quantity === 0) {
            car.inStock = false;
        }
        else {
            car.inStock = true;
        }
        yield car.save();
        next();
    });
});
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
