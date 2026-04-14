import orderModel, { OrderItemInput } from "../models/orderModule.js";
import productModel from "../models/productModel.js";
import { getActiveCartforUser } from "./cartservices.js";
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

  const order = await orderModel.create({
    orderitem: orderitems,
    total: cart.totalAmount,
    userId,
  });
  await order.save();
  cart.status = "completed";
  await cart.save();
  return { data: order, statusCode: 200 };
};
