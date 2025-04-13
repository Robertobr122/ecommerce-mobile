// src/controllers/ProductController.js
import ProductModel from '../models/ProductModel.js';

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default productController;
