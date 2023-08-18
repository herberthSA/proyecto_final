import express from "express"
import { checkUser } from "../middlewares/auth.js";
import { cartscontrollers } from "../controller/carts.controller.js";

export const  routerCarts = express.Router()
routerCarts.get('/:cid',cartscontrollers.getOne);
routerCarts.get('/:cid/purchase',cartscontrollers.purchaseProducts);
routerCarts.post('/', cartscontrollers.createProduct);
// ruta para agregar productos al carrito
routerCarts.put('/:cid',checkUser,cartscontrollers.addProduct);
routerCarts.delete('/:cid/products/:pid',cartscontrollers.deleteProduct);
routerCarts.put('/:cid/products/:pid',cartscontrollers.updateProduct);

