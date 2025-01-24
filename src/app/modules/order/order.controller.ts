/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderService } from './order.service';
import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { OrderModel } from './order.model';
import catchAsync from '../../utils/catchAsync';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const zodParsedData = orderValidationSchema.parse(orderData);
  const result = await OrderService.createOrderIntoDB(zodParsedData);
  res.status(200).json({
    message: 'Order created successfully',
    status: true,
    data: result,
  });
});
const getRevenue = catchAsync(async (req: Request, res: Response) => {
  const revenue = await OrderModel.aggregate([
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
});

export const OrderController = {
  createOrder,
  getRevenue,
};
