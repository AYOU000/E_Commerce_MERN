import orderModel, { OrderItemInput } from "../models/orderModule";
import productModel from "../models/productModel";
import { getActiveCartforUser } from "./cartservices";
interface getordersforUserPrams
{
 userId: string; 
}
export const getordersforUser = async ({
  userId,
}: getordersforUserPrams) => {
 const orders = await orderModel.find({ userId });
 if(!orders.length)
 {
  return {data:{message:"orders not found"},statuscode:400}
 }
 
 return {data:orders,statuscode:400}
}
interface checkoutforuserPrams {
  userId: string;
}
export const checkoutforuser = async ({
  userId,
}: checkoutforuserPrams) => {
  const cart = await getActiveCartforUser({ userId });
  const orderitems: OrderItemInput[] = [];

  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "product not found!", statusCode: 400 };
    }
    const orderItem: OrderItemInput = {
      productTitle: product.title,
      productImage: product.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    };
    orderitems.push(orderItem);
  }
}
