import mongoose from 'mongoose';
import { customerSchema } from './models/Customer.model.js';

const shoppingCartSchema = new mongoose.Schema({
  customer: customerSchema,
  orderItems: { type: Array },
  orderSum: { type: Number, required: true, min: 0 },
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

export default ShoppingCart;
