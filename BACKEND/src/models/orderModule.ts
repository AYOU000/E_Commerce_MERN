import mongoose, { Schema ,Document, ObjectId}  from "mongoose";

export interface OrderItemInput  
{
  productTitle: string;
  productImage:string;
  unitPrice:number;        
  quantity:number;
}
export interface Iorder extends Document
{
 orderitem:[OrderItemInput ];
 total: number;
 userId: ObjectId | string ;
}

const orderitemschema = new Schema<OrderItemInput>({
  productTitle:{type:String,required:true},
  productImage:{type:String,required:true},
  unitPrice:{type:Number,required:true},
  quantity:{type:Number,required:true}
})
const orderschema = new Schema <Iorder>({
 orderitem:[orderitemschema],
 total:{type:Number,required:true},
 userId:{type:Schema.Types.ObjectId,ref:"user",required:true}
})
const orderModel = mongoose.model<Iorder>('order',orderschema);

export default orderModel;
