import { Schema,model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productsSchema = new Schema ({
    title: { type: String ,required:true },
    description: { type: String ,required:true},
    price: { type: Number ,required:true },
    thumbnail:{type: String },
    status: {type: Boolean ,required:true},
    category:{ type: String ,required:true },
    code: { type: String ,required:true , unique:true },
    stock: { type: Number ,required:true },
})
productsSchema.plugin(mongoosePaginate)
export const productsModel = model('products',productsSchema)