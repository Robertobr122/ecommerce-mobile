// src/controllers/CartController.js
import CartModel from '../models/CartModel.js';
import PurchaseModel from '../models/PurchaseModel.js';
import ProductModel from '../models/ProductModel.js';

const cartController = {
  // Obter o carrinho de um usuário
  getCart: async (req, res) => {
    try {
      const { userId } = req.params;
      let cart = await CartModel.findOne({ user: userId }).populate('items.product');
      if (!cart) {
        cart = await CartModel.create({ user: userId, items: [] });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Adicionar item ao carrinho
  addItem: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      const product = await ProductModel.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      let cart = await CartModel.findOne({ user: userId });
      if (!cart) {
        cart = await CartModel.create({ user: userId, items: [] });
      }

      // Se o item já existir, incrementa a quantidade
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: quantity || 1,
          price: product.currentPrice
        });
      }
      
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Remover item do carrinho
  removeItem: async (req, res) => {
    try {
      const { userId, productId } = req.body;
      let cart = await CartModel.findOne({ user: userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Finalizar compra e limpar o carrinho
  finalizePurchase: async (req, res) => {
    try {
      const { userId } = req.body;
      let cart = await CartModel.findOne({ user: userId }).populate('items.product');
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      let totalPrice = 0;
      const purchaseItems = cart.items.map(item => {
        totalPrice += item.price * item.quantity;
        return {
          productName: item.product.name,
          itemPrice: item.price,
          quantity: item.quantity
        };
      });

      const purchase = await PurchaseModel.create({
        user: userId,
        items: purchaseItems,
        totalPrice,
        purchaseDate: new Date()
      });

      // Limpar carrinho
      cart.items = [];
      await cart.save();

      res.json({ message: "Purchase completed", purchase });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default cartController;
