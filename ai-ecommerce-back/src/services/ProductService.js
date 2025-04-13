// src/services/ProductService.js
import ProductModel from '../models/ProductModel.js';

const ProductService = {
  async getAllProducts() {
    return await ProductModel.find();
  },
  async getProductById(id) {
    return await ProductModel.findById(id);
  }
  // Implemente outras lógicas conforme necessário.
};

export default ProductService;
