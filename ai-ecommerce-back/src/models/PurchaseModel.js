// src/models/PurchaseModel.js
import mongoose from 'mongoose';

const PurchaseItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  quantity: { type: Number, default: 1 }
});

const PurchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [PurchaseItemSchema],
  totalPrice: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now }
});

const PurchaseModel = mongoose.model('Purchase', PurchaseSchema);
export default PurchaseModel;
