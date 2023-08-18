import { carts } from "../services/carts.service.js";

class cartsController {
    getOne = async(req,res)=> {
        const {cid} = req.params
        const viewCart = await carts.viewAll(cid)
        return res.status(200).send({data:{viewCart}})
    };
    createProduct = async(req,res)=>{
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
    };
    addProduct = async(req,res)=>{
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
    };
    deleteProduct = async(req,res)=>{
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
    };
    updateProduct = async(req,res)=>{
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
    
    }
    purchaseProducts = async(req,res)=>{
        const {cid} = req.params
        const email = req.session.user.email; 
        const viewCart = await carts.purchase(cid,email)
        return res.status(200).send({data:{viewCart}})
    }

}

export const cartscontrollers = new cartsController ()