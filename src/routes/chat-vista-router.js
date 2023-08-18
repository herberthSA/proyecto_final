import express from 'express';
import { chatController } from '../controller/chat-vista-controller.js';
import { checkUser } from '../middlewares/auth.js';

export const routerVistaChatSocket = express.Router();

routerVistaChatSocket.get('/',checkUser, chatController.chat);