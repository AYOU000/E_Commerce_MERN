import cartModel from "../models/cartModule";

interface creatCartforUserPrams
{
  userId: string;
}
interface getActiveCartforUserPrams
{
 userId: string;  
}

const creatCartforUser = async ({userId}:creatCartforUserPrams) =>
{
  const cart = await cartModel.create({userId , totalAmount:0}) ;
  await cart.save();
  return cart ;
}

export const getActiveCartforUser = async ({userId}:getActiveCartforUserPrams) =>
{
  let cart = await cartModel.findOne({userId,status:"active"})

  if(!cart)
  {
    cart =  await creatCartforUser({userId})
  }

  return cart; 
}

