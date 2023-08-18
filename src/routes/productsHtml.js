import  express  from "express";
import { checkUser } from "../middlewares/auth.js";
import { productsHtmlcontroller } from "../controller/productsHtml.controller.js";

export const productsHtml = express.Router();

productsHtml.get("/",checkUser,productsHtmlcontroller.viewProducts );