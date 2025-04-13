// src/routers/ChatRouter.js
import express from 'express';
import chatController from '../controllers/ChatController.js';

const router = express.Router();

router.post('/chat/user', (req, res) => chatController.userChat(req, res));
router.post('/chat/ai', (req, res) => chatController.aiChat(req, res));

export default router;
