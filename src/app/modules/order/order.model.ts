import { model, Schema } from 'mongoose';
import { Order } from './order.interface';
import { CarModel } from '../car/car.model';

const orderSchema = new Schema<Order>(
  {
    email: { type: String, required: true },
    car: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

orderSchema.pre('save', async function (next) {
  const car = await CarModel.findById(this.car);
  if (car) {
    car.quantity -= this.quantity;

    // Adjust stock status
    if (car.quantity === 0) {
      car.inStock = false;
    } else {
      car.inStock = true;
    }

    await car.save();
  }
  next();
});

export const OrderModel = model<Order>('Order', orderSchema);
