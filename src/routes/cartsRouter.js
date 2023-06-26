import express from "express"
import { cartsService } from "../services/carts.service.js"
const carts = new cartsService
export const  routerCarts = express.Router()
routerCarts.get('/:cid',async(req,res)=>{
    const {cid} = req.params
    const viewCart = await carts.viewAll(cid)
    return res.status(200).json({
        data:{viewCart}
    })

});
routerCarts.post('/', async(req,res)=>{
try {
    const createOne = await carts.createOne();
    return res.status(200).json(
        {
            status: "succes",
            msg: "add ok",
            data: createOne
       }
    )
    
} catch (error) {
    //console.log(error)
    return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data:error,
      });
    
}
});
routerCarts.put('/:cid',async(req,res)=>{
    const {cid } = req.params
    const { product } = req.body
    try {
        const resultado = await carts.updateOne(cid,product)
        //console.log(resultado)
        res.status(200).json({
            data: resultado
        })
    } catch (error) {
        res.status(500).json({
            data:error
        })
        
    }
});
routerCarts.delete('/:cid/products/:pid',async(req,res)=>{
    const {cid , pid}= req.params
    try {
        const result = await carts.deleteOne(cid,pid);
        res.status(200).json({
            data:result
        })
    } catch (error) {
        res.status(500).json({
            data:error
        })
    }
});
routerCarts.put('/:cid/products/:pid',async(req,res)=>{
    const {cid,pid}= req.params
    const {quantity } = req.body
    try {
        const result = await carts.updateQuantity(cid,pid,quantity);
        res.status(200).json({
            data:result
        })
    } catch (error) {
        res.status(500).json({
            data:error
        })
    }

});

