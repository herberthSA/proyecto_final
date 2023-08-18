import express from "express"
import { cartsHtmlController } from "../controller/cartsHtml.controller.js";

export const cartstsHtml = express.Router();

cartstsHtml.get('/:cid', cartsHtmlController.viewCarts)