// src/models/ProductModel.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  promotionPrice: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String },
  expiryDate: { type: Date, required: true }
}, { timestamps: true });

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
