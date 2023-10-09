import { cartsModel } from "../DAO/Mongo/models/carts.model.js";
import { ticketsModel } from "../DAO/Mongo/models/ticket.model.js";
import { logger } from "../utils/logger.js";
import { products } from "./products.service.js";

class cartsService {

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
  const msg = ''
    try {
        const result = await cartsModel.updateOne(
          { _id: cartId },
          { $pull: { products: { product: productId } } }
        );
    
        if (result.nModified === 0) {
          logger.info('No se encontró el carrito o el producto en el carrito.');;
        }
    
        logger.info('Producto eliminado del carrito.');;
      } catch (error) {
        logger.error('Error al eliminar el producto del carrito:', error);
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
        //console.log(existingProduct)
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
        logger.error(error)
        
        
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
       logger.error('Error al actualizar la cantidad del producto en el carrito:', error);
      }
}

 #generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}
#getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
async createTicket(id,amount,email){
  const newTicket = {
    code: this.#generateRandomCode(8), // Genera un código de 8 caracteres
    purchase_datetime: this.#getCurrentDateTime(),
    amount: amount,
    purchase: [
      {
        email: email,
        cart: id,
      }
    ]
  };

   const result = await ticketsModel.create(newTicket)
   return result
}
async purchase(id,email){
  const result = await this.viewAll(id);
  let amount = 0;
  console.log(result.products);

  for (const product of result.products) {
    const infoProduct = product.product;
    const stock = infoProduct.stock;
    const productID = infoProduct._id.toString();
    const quantity = product.quantity;
    const availabilityProduct = stock - quantity;

    if (availabilityProduct >= 0) {
      await this.deleteOne(id, productID);
      
      // Aquí debes asegurarte de usar la sintaxis correcta para updateOne
      await products.updateOne(productID,
          infoProduct.title,
          infoProduct.description,
          infoProduct.price,
          infoProduct.thumbnail,
          infoProduct.status,
          infoProduct.category,
          infoProduct.code,
          availabilityProduct
      );

      amount += infoProduct.price;
    }
  }

  logger.debug("Monto total:", amount);
   const newTicket =await this.createTicket(id,amount,email)
  return newTicket;

}
}

export const carts = new cartsService();






