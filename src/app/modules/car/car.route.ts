import express from 'express';
import { CarController } from './car.controller';

const router = express.Router();
router.post('/cars', CarController.createCar);

export const CarRoutes = router;