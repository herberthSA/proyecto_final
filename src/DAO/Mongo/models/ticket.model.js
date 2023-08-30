import { Schema,model } from "mongoose";
const ticketSchema = new Schema ({
    code: {
        type: String,
        required: true,
        unique: true,

    },
      purchase_datetime:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,

    },
    purchase:{
        type:[
            {
                email: {
                    type: String,
                   },
                cart: {
                  type: Schema.Types.ObjectId,
                  ref: 'carts',
                 }
                
              }
        ],
        default: [],
    }
       
    
   
});
export const ticketsModel = model('tickets',ticketSchema);