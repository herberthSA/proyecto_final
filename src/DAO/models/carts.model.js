import { Schema,model } from "mongoose";
const cartsSchema = new Schema ({
    products: {
          type: [
            {
              product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
               },
              quantity: {
                type: Number,
               }
            }
          ],
          default: [],
        }
});
export const cartsModel = model('carts',cartsSchema);