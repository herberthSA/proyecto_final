import express from "express"
import { viewController } from "../controller/viewsController.js";
export const viewsRouter = express.Router();

viewsRouter.get('',viewController.getLogin);
viewsRouter.get('/register', viewController.getRegister);
viewsRouter.get('/users',viewController.viewUsers);