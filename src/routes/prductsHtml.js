import  express  from "express";
import { productService } from "../services/products.service.js";
import { checkUser } from "../middlewares/auth.js";
const products = new productService()

export const productsHtml = express.Router();

productsHtml.get("/",checkUser, async (req, res) => {
  
    const {limit , page} = req.query
    const {category}= req.params
    const  users ={
      firstname : req.session.firstName,
      admin :req.session.admin,
      email: req.session.email

    }
    console.log(users.firstname)
    
    
    try {
      const productsAll = await products.getAll(limit,page,category);
      let productsView = productsAll.docs.map(products=>{
        return {
          id:products._id.toString(),
          title:products.title,
          description:products.description,
          price: products.price,
          thumbnail: products.thumbnail,
          code: products.code,
          status: products.status,
          category:products.category,
          stock: products.stock
        };
      })
       let pagination = {
        totalPages:productsAll.totalPages,
        prevPages: productsAll.prevPage,
        nextPage: productsAll.prevPage,
        page: productsAll.page,
        hasPrevPage: productsAll.hasPrevPage,
        hasNextPage: productsAll.hasNextPage,
        prevLink: productsAll.hasPrevPage ? `http://localhost:8080/api/products?page=${productsAll.prevPage}`: null,
        nextLink: productsAll.hasNextPage ? `http://localhost:8080/api/products?page=${productsAll.nextPage}`: null
      }

      return res.status(200).render('products',{products:productsView , pagination, users})
       /* return res.status(200).render('products',{
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
      }) */
    
  
      
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    
  }
  });