import mongoose from 'mongoose';
import { customerSchema } from './Customer.model.js';

const orderItemsSchema = new mongoose.Schema({
  item: {
    name: { type: String },
    price: { type: Number, min: 0 },
    amount: { type: Number, min: 0 },
  },
});
const shoppingCartSchema = new mongoose.Schema({
  customer: customerSchema,
  orderItems: [orderItemsSchema],
  orderSum: { type: Number, required: true, min: 0 },
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

export default ShoppingCart;
