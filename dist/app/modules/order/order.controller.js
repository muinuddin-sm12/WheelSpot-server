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
exports.OrderController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const order_model_1 = require("./order.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const {order: orderData} = req.body;
        const orderData = req.body;
        const zodParseData = order_validation_1.orderValidationSchema.parse(orderData);
        const result = yield order_service_1.OrderService.createOrderIntoDB(zodParseData);
        res.status(200).json({
            message: "Order created successfully",
            status: true,
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_model_1.OrderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" },
                }
            }
        ]);
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: revenue,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.OrderController = {
    createOrder,
    getRevenue
};
