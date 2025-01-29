import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';
import { CarModel } from '../car/car.model';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  }
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

export const OrderModel = model<IOrder>('Order', orderSchema);
