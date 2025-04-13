// src/routers/CartRouter.js
import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

router.get('/cart/:userId', (req, res) => cartController.getCart(req, res));
router.post('/cart/add', (req, res) => cartController.addItem(req, res));
router.post('/cart/remove', (req, res) => cartController.removeItem(req, res));
router.post('/cart/finalize', (req, res) => cartController.finalizePurchase(req, res));

export default router;
