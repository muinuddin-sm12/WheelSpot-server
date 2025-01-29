/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { orderService } from './order.service';
import { User } from '../user/user.model';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = await User.findById(req?.body?.user);
  const products = req.body.products;
  // console.log(user)
  const order = await orderService.createOrder(user, {products}, req.ip!);
  res.status(200).json({
    message: 'Order placed successfully',
    status: true,
    data: order,
  });
});
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
const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrders();

  res.status(200).json({
    message: "Order retrieved successfully",
    status: true,
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  res.status(200).json({
    message: "Order verified successfully",
    data: order,
  })
});
export const OrderController = {
  createOrder,
  // getRevenue,
  getOrders,
  verifyPayment
};
