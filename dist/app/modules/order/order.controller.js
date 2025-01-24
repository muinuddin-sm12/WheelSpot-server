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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const order_model_1 = require("./order.model");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    const zodParsedData = order_validation_1.orderValidationSchema.parse(orderData);
    const result = yield order_service_1.OrderService.createOrderIntoDB(zodParsedData);
    res.status(200).json({
        message: 'Order created successfully',
        status: true,
        data: result,
    });
}));
const getRevenue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const revenue = yield order_model_1.OrderModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
    ]);
    res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: {
            totalRevenue: revenue[0].totalRevenue,
        },
    });
}));
exports.OrderController = {
    createOrder,
    getRevenue,
};
