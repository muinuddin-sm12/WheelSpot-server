import { model, Schema } from 'mongoose';
import { Order } from './order.interface';

const orderSchema = new Schema<Order>({
  email: { type: String, required: true },
  car: { type: String, required: true },
  quantity: Number,
  totalPrice: Number,
});

// orderSchema.pre('save', function (next) {
//   this.totalPrice = this.quantity * this.totalPrice;
//   next();
// });

export const OrderModel = model<Order>('Order', orderSchema);
