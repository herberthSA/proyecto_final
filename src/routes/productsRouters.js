import express from "express";
import { checkAdmin } from "../middlewares/auth.js";
import { productsController } from "../controller/products.controller.js";

export const routerProducts = express.Router();

// Ruta para ver todos los productos al igual se puede enviar un limite en productos
routerProducts.get("/", productsController.getProducts);
// Ruta para ver un producto en especifico
routerProducts.get("/:pid", productsController.getOneproduct);
// Ruta para agregar nuevos productos
routerProducts.post("/",checkAdmin,productsController.addProduct);
// Ruta para eliminar un producto por su ID
routerProducts.delete('/:pid',checkAdmin,productsController.deleteProduct);
// Ruta para actualizar un campo y su valor por medio del ID
routerProducts.put('/:pid',productsController.updateProduct);






