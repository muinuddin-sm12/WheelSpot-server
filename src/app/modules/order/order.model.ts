import mongoose, { model, Schema } from 'mongoose';
import { Order } from './order.interface';

const orderSchema = new Schema<Order>({
  email: { type: String, required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Cars', required: true },
  quantity: Number,
  totalPrice: Number,
});

export const OrderModel = model<Order>('Order', orderSchema);
