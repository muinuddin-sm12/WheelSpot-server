"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const car_route_1 = require("../modules/car/car.route");
const order_route_1 = require("../modules/order/order.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/auth', route: auth_route_1.AuthRoutes },
    { path: '/cars', route: car_route_1.CarRoutes },
    { path: '/orders', route: order_route_1.OrderRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
