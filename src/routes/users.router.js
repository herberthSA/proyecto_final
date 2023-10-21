import express from "express"
import { userController } from "../controller/users.controller.js";
export const usersRouter = express.Router();

usersRouter.get('',userController.getUsers);
usersRouter.delete('',userController.deleteUsers);
