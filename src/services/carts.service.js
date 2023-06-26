import { cartsModel } from "../DAO/models/carts.model.js";
export class cartsService {

async viewAll (id){
    const viewCarts = await cartsModel.findOne({_id:id}).populate('products.product')
    //console.log(viewCarts);
    return viewCarts
}
async createOne (){
    const data = {
        products:[]
    }
    const productCreated = await cartsModel.create(data);
    return productCreated;
}
async deleteOne(cartId , productId ){
    try {
        const result = await cartsModel.updateOne(
          { _id: cartId },
          { $pull: { products: { product: productId } } }
        );
    
        if (result.nModified === 0) {
            console.log('No se encontró el carrito o el producto en el carrito.');
        }
    
        console.log('Producto eliminado del carrito.');
      } catch (error) {
        console.log('Error al eliminar el producto del carrito:', error);
      }
    
}
async updateOne(carritoId,product){
    //console.log(carritoId,product)
    const filtro = { _id: carritoId };
    const update = {
        $addToSet: {
          products: {
            product: product,
            quantity: 1
          }
        }
      };

try {

    const carrito = await cartsModel.findOne(filtro);
    if(carrito){
       const existingProduct = carrito.products.find(p => p.product.equals(product));
       if (existingProduct) {
        // El producto ya existe, aumentar la cantidad en 1
        existingProduct.quantity += 1;
        console.log(existingProduct)
        await carrito.save();
        return existingProduct
      }else{
        const addCarts = await cartsModel.updateOne(filtro,update)
        // console.log(addCarts)
        return addCarts

      }
    }
   
   
    
    }
    catch (error) {
        console.log(error);
        
        
    }
    
      
} 
async updateQuantity(cartId, productId, newQuantity){
    const respuesta = 'quantity modificado'
    try {
        const result = await cartsModel.updateOne(
          { _id: cartId, 'products.product': productId },
          { $set: { 'products.$.quantity': newQuantity } }
        );
    
        if (result.nModified === 0) {
          return console.log('No se encontró el carrito o el producto en el carrito.');
        }
    
        return respuesta
      } catch (error) {
        console.log('Error al actualizar la cantidad del producto en el carrito:', error);
      }
   
    
    
    
    
    
}
}






