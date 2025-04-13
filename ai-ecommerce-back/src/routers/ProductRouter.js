// src/routers/ProductRouter.js
import express from 'express';
import productController from '../controllers/ProductController.js';

const router = express.Router();

router.get('/product', (req, res) => productController.getProducts(req, res));
router.get('/product/:id', (req, res) => productController.getProductById(req, res));

export default router;

