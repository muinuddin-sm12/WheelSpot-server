/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderService } from './order.service';
import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { OrderModel } from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderService.createOrderIntoDB(zodParsedData);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};
const getRevenue = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      status: false,
      error: error,
      stack: error.stack,
    });
  }
};

export const OrderController = {
  createOrder,
  getRevenue,
};
