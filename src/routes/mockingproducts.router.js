import  express  from "express";
import { mockingProduct } from "../controller/mockingproducts.controller.js";
export const routerMocking = express.Router();

routerMocking.get('/',mockingProduct.get)