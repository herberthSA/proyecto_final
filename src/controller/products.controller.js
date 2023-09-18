import CustomError from "../services/error/custom-error.js";
import EErros from "../services/error/enums.js";
import { products } from "../services/products.service.js";
import { logger } from "../utils/logger.js";

class productsControllers{

async getProducts(req,res){
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
    logger.error(error);
    /* CustomError.createError({
        name: "User creation error",
        message: "Error trying to create user",
        code: EErros.INVALID_TYPES_ERROR,
      
    }) */
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  
}
};
async addProduct (req, res){
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

      logger.debug(req.body);
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
        msg: "product created",
        data: productCreated,
      });
    } catch (error) {
       logger .error(error);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
};
async getOneproduct(req, res){
    const {pid} = req.params;
    const result = await products.getOne(pid);
    res.status(200).send({msg:"ok" , data:result})
}
async deleteProduct(req,res){
    try {
        const {pid} = req.params
        const result = await products.deletedOne(pid);
        res.status(200).send({msg:"Se elimino correctamente", data:result});
  
        
     } catch (error) {
        res.status(404).send(error);
     }
};
async updateProduct(req,res){
 
    try {
        const {pid} = req.params
        const {title, description, price ,thumbnail,status,category,code,stock} = req.body
        const result = await products.updateOne(pid,title, description, price ,thumbnail,status,category,code,stock)
        res.status(200).send({msg:"Se actulizo correctamente", data:result});
        
    } catch (error) {
        res.status(404).send(error);
    }
    


}

}

export const productsController = new productsControllers()
