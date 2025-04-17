// src/routers/UserRouter.js
import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.route('/prompt')
.post((req,res) => userController.prompt(req,res))

router.route('/longContext')
.post((req,res) => userController.longContext(req,res))

router.post('/user/register', (req, res) => userController.register(req, res));
router.post('/user/login', (req, res) => userController.login(req, res));
router.get('/user/:id', (req, res) => userController.getUser(req, res));

export default router;
