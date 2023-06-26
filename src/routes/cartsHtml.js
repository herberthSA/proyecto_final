import express from "express"
import { cartsService } from "../services/carts.service.js"
const carts = new cartsService

export const cartstsHtml = express.Router();

cartstsHtml.get('/:cid',async(req,res)=>{
    const {cid}= req.params
    const viewCart = await carts.viewAll(cid)
    let cartProduct = viewCart.products.map(carts=>{
        return{
            id: carts.product._id.toString(),
            title:carts.product.title,
            description:carts.product.description,
            price: carts.product.price,
            thumbnail: carts.product.thumbnail,
            code: carts.product.code,
            status: carts.product.status,
            category:carts.product.category,
            stock: carts.product.stock
        }
    })
   
    //console.log(cartProduct);

    res.status(200).render('cart',{products:cartProduct , id:cid})

})