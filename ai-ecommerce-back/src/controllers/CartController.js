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
      const { userId, cart } = req.body;
  
      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ message: "Carrinho vazio ou inválido." });
      }
  
      let totalPrice = 0;
      const purchaseItems = [];
  
      // Criação da compra e cálculo do total


      for (const item of cart) {
        if (!item.id || !item.name || !item.price || !item.quantity) {
          return res.status(400).json({ message: "Dados do item inválidos." });
      }

      const subtotal = item.price * item.quantity;
      totalPrice += subtotal;

      console.log(item.id)
      console.log(item.name)

      purchaseItems.push({
        productId: item.id,
        productName: item.name,
        itemPrice: item.price,
        quantity: item.quantity
      });
    }
  
      // Criação da compra no banco
      const purchase = await PurchaseModel.create({
        user: userId,
        items: purchaseItems,
        totalPrice,
        purchaseDate: new Date()
      });
  
      // Limpar os itens do carrinho após a compra
      const cartToUpdate = await CartModel.findOne({ user: userId });
      if (cartToUpdate) {
        cartToUpdate.items = [];  // Limpando os itens
        await cartToUpdate.save(); // Salvando a atualização do carrinho no banco
      }
  
      res.json({ message: "Compra finalizada com sucesso!", purchase });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
};

export default cartController;
