import cartModel from "../models/cartModule";
import orderModel, {  OrderItemInput } from "../models/orderModule";
import productModel from "../models/productModel";

interface creatCartforUserPrams {
  userId: string;
}
interface getActiveCartforUserPrams {
  userId: string;
  popluateProduct?: boolean;
}

const creatCartforUser = async ({ userId }: creatCartforUserPrams) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

export const getActiveCartforUser = async ({
  userId,
  popluateProduct
}: getActiveCartforUserPrams) => {
  let cart ;
  if(popluateProduct)
  {
    cart = await cartModel.findOne({ userId, status: "active" }).populate('items.product')
  }
  else 
  {
    cart = await cartModel.findOne({ userId, status: "active" })
  }

  if (!cart) {
    cart = await creatCartforUser({ userId });
  }
  return cart;
};
interface clearCartPrams {
  userId: string;
}
export const clearCartforuser =  async ({userId}:clearCartPrams) =>
{
  const cart = await  getActiveCartforUser({userId});
  cart.items = [] ;
  cart.totalAmount = 0;
  const updatedcart = await  cart.save();
  return { data: updatedcart, statusCode: 200 };
}
interface additemforuserPrams {
  productId: any;
  quantity: number;
  userId: string;
}
export const additemforuser = async ({
  productId,
  quantity,
  userId,
}: additemforuserPrams) => {
  const cart = await getActiveCartforUser({ userId });

  const exsistProduct = cart.items.find((p) => {
    return p.product.toString() === productId.toString();
  });
  if (exsistProduct) {
    return { data: "product already exsit in the cart ", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "product not found!", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "low product stock fro item !", statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });
  cart.totalAmount += product.price * quantity;

  const updatedcart = await cart.save();
  return { data: await getActiveCartforUser({ userId , popluateProduct: true }), statusCode: 200 };
};
interface updateitemforuserPrams {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateitemforuser = async ({
  productId,
  quantity,
  userId,
}: updateitemforuserPrams) => {
  const cart = await getActiveCartforUser({ userId });

  const exsistProduct = cart.items.find((p) => {
    return p.product.toString() === productId.toString();
  });
  if (!exsistProduct) {
    return { data: "product  doesn t exsit  in the cart ", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "product not found!", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "low product stock for item !", statusCode: 400 };
  }

  const otherproduct = cart.items.filter((p) => {
    return p.product.toString() !== productId.toString();
  });
  let total = otherproduct.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  exsistProduct.quantity = quantity;
  total += exsistProduct.quantity * exsistProduct.unitPrice;
  cart.totalAmount = total;
  await cart.save();
  return { data: await getActiveCartforUser({ userId , popluateProduct: true }), statusCode: 200 };
};
interface deleteitemforuserPrams {
  productId: any;
  userId: string;
}
export const deleteitemforuser = async ({
  productId,
  userId,
}: deleteitemforuserPrams) => {
  const cart = await getActiveCartforUser({ userId });

  const exsistProduct = cart.items.find((p) => {
    return p.product.toString() === productId.toString();
  });
  if (!exsistProduct) {
    return { data: "product  doesn t exsit  in the cart ", statusCode: 400 };
  }
  const otherproduct = cart.items.filter((p) => {
    return p.product.toString() !== productId.toString();
  });
  let total = otherproduct.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  cart.items = otherproduct; 
  cart.totalAmount = total;
  await cart.save();
  return { data: await getActiveCartforUser({userId,popluateProduct: true}), statusCode: 200 };
};
interface checkoutforuserPrams {
  userId: string;
  address: string;
}
export const checkoutforuser = async ({userId, address}:checkoutforuserPrams) =>
{
  const cart = await getActiveCartforUser({ userId });
  const orderitems: OrderItemInput[] = [];

  for(const item of cart.items)
  {
    const product = await productModel.findById(item.product);
    if (!product) {
    return { data: "product not found!", statusCode: 400 };
  }  
    const orderItem: OrderItemInput  = {
      productTitle: product.title,
      productImage:product.image,
      unitPrice:item.unitPrice,
      quantity:item.quantity,
    };
     orderitems.push(orderItem);
  }

  const order = await orderModel.create({
    orderitem:orderitems,
    total: cart.totalAmount,
    address,
    userId
  });
  await order.save();
  cart.status = "completed";
  await cart.save();
  return {data:order,statusCode: 200}
}