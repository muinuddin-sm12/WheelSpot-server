import { model, Schema } from 'mongoose';
import { Order } from './order.interface';
import { CarModel } from '../car/car.model';

const orderSchema = new Schema<Order>(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    carDetails: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {type: Boolean, default: false}
  },
  {
    timestamps: true,
  },
);

orderSchema.pre('save', async function (next) {
  const car = await CarModel.findById(this.carDetails);
  if (car) {
    car.quantity -= this.quantity;

    // Adjust stock status
    if (car.quantity === 0 || car.quantity <0) {
      car.inStock = false;
    } else {
      car.inStock = true;
    }

    await car.save();
  }
  next();
});

export const OrderModel = model<Order>('Order', orderSchema);
