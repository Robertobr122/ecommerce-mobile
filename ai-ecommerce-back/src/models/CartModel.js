// src/models/CartModel.js
import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema]
}, { timestamps: true });

const CartModel = mongoose.model('Cart', CartSchema);
export default CartModel;

