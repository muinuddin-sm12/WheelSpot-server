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
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const order_service_1 = require("./order.service");
const user_model_1 = require("../user/user.model");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findById((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.user);
    const products = req.body.products;
    const order = yield order_service_1.orderService.createOrder(user, { products }, req.ip);
    res.status(200).json({
        message: 'Order placed successfully',
        status: true,
        data: order,
    });
}));
// const getRevenue = catchAsync(async (req: Request, res: Response) => {
//   const revenue = await OrderModel.aggregate([
//     {
//       $group: {
//         _id: null,
//         totalRevenue: { $sum: '$totalPrice' },
//       },
//     },
//   ]);
//   res.status(200).json({
//     message: 'Revenue calculated successfully',
//     status: true,
//     data: {
//       totalRevenue: revenue[0].totalRevenue,
//     },
//   });
// });
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.getOrders();
    res.status(200).json({
        message: "Order retrieved successfully",
        status: true,
        data: order,
    });
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.verifyPayment(req.query.order_id);
    res.status(200).json({
        message: "Order verified successfully",
        data: order,
    });
}));
exports.OrderController = {
    createOrder,
    // getRevenue,
    getOrders,
    verifyPayment
};
