import express from 'express';

const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/:userId', OrderController.getRevenue);

export const OrderRoutes = router;
