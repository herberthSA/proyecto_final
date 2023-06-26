import express from "express";
import { productService } from "../services/products.service.js";
const products = new productService();

export const routerProducts = express.Router();

routerProducts.get("/", async (req, res) => {
  
  const {limit , page} = req.query
  const {category}= req.params
  try {
    const productsAll = await products.getAll(limit,page,category);
     return res.status(200).json({
        status: "success",
        payload: productsAll.docs,
        totalPages:productsAll.totalPages,
        prevPages: productsAll.prevPage,
        nextPage: productsAll.prevPage,
        page: productsAll.page,
        hasPrevPage: productsAll.hasPrevPage,
        hasNextPage: productsAll.hasNextPage,
        prevLink: productsAll.hasPrevPage ? `http://localhost:8080/api/products?page=${productsAll.prevPage}`: null,
        nextLink: productsAll.hasNextPage ? `http://localhost:8080/api/products?page=${productsAll.nextPage}`: null
    })
  

    
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  
}
});

routerProducts.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      status,
      category,
      code,
      stock,
    } = req.body;
    const productCreated = await products.createOne(
      title,
      description,
      price,
      thumbnail,
      status,
      category,
      code,
      stock
    );
    return res.status(201).json({
      status: "success",
      msg: "user created",
      data: productCreated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
