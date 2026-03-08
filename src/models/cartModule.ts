import mongoose, { Schema ,Document, ObjectId}  from "mongoose";
import { IProduct } from "./productModel";

const CartstatusEnum = ["active" ,"completed"]
export interface IcartItem  extends Document
{
   product: IProduct;
   unitPrice: number;
   quantity: number;
} 
export interface Icart  extends Document
{
  userId: ObjectId | String ;
  item: IcartItem[];
  totalAmount: number;
  status : "active" | "completed" 
}
const cartItemschema = new Schema<IcartItem>({
 
    product:{type: Schema.Types.ObjectId,ref: "products",required: true},
    unitPrice:{type: Number,required:true},
    quantity:{type: Number,required:true,default:1}
})

const cartschema = new Schema<Icart>({
   userId:{type: Schema.Types.ObjectId,ref: "user",required: true},
   item:{cartItemschema},
   totalAmount:{type: Number,required:true},
   status:{type: String,enum:CartstatusEnum,default:"active"}
})   

const cartModel = mongoose.model<Icart>('cart',cartschema);

export default cartModel;