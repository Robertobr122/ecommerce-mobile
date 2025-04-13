// src/controllers/UserController.js
import UserModel from '../models/UserModel.js';

const userController = {
  register: async (req, res) => {
    try {
      const { fullName, cpf, login, password } = req.body;
      // (Adicionar validações de CPF, email, etc.)
      const newUser = await UserModel.create({ fullName, cpf, login, password });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { login, password } = req.body;
      // Autenticação básica – implemente autenticação robusta se necessário
      const user = await UserModel.findOne({ login, password });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default userController;
