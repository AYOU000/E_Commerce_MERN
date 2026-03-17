import cartModel from "../models/cartModule";
import productModel from "../models/productModel";

interface creatCartforUserPrams {
  userId: string;
}
interface getActiveCartforUserPrams {
  userId: string;
}

const creatCartforUser = async ({ userId }: creatCartforUserPrams) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

export const getActiveCartforUser = async ({
  userId,
}: getActiveCartforUserPrams) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await creatCartforUser({ userId });
  }
  return cart;
};
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
  return { data: updatedcart, statusCode: 200 };
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
    return { data: "low product stock fro item !", statusCode: 400 };
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
  const updatedcart = await cart.save();
  return { data: updatedcart, statusCode: 200 };
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
  const updatedcart = await cart.save();
  return { data: updatedcart, statusCode: 200 };
};
