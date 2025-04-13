// src/routers/UserRouter.js
import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/user/register', (req, res) => userController.register(req, res));
router.post('/user/login', (req, res) => userController.login(req, res));
router.get('/user/:id', (req, res) => userController.getUser(req, res));

export default router;
