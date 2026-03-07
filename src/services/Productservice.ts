import productModel from "../models/productModel";

export const getallproduct = async () =>
{
return  await productModel.find();
}

export const seedinitialproduct = async () =>
{
 const products = [
  {
    title: "Wireless Noise-Cancelling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    price: 299.99,
    stock: 14,
  },
  {
    title: "Minimalist Leather Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    price: 189.00,
    stock: 7,
  },
  {
    title: "Running Sneakers Pro",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    price: 134.95,
    stock: 32,
  },
  {
    title: "Mechanical Keyboard TKL",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    price: 159.00,
    stock: 0,
  },
  {
    title: "Portable Bluetooth Speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    price: 89.99,
    stock: 21,
  },
  {
    title: "Ceramic Coffee Pour-Over Set",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    price: 54.00,
    stock: 5,
  },
  {
    title: "Ultrawide 34\" Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    price: 749.00,
    stock: 3,
  },
  {
    title: "Linen Tote Bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    price: 38.50,
    stock: 60,
  },
  {
    title: "Succulent Plant Trio",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&h=400&fit=crop",
    price: 27.00,
    stock: 18,
  },
  {
    title: "Hardcover Dot-Grid Notebook",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
    price: 19.99,
    stock: 45,
  },
]; 

  const exsitingproduct = await getallproduct();
  if(exsitingproduct.length === 0)
  {
    await productModel.insertMany(products)
  }
}