"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./app/router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ['https://l2-assignment-4-backend-kappa.vercel.app', 'http://localhost:5173', 'http://localhost:5175'], credentials: true }));
// application routes
app.use('/api/v1', router_1.default);
app.get('/', (req, res) => {
    res.send('Hello from L2-Assignment-4!');
});
exports.default = app;
