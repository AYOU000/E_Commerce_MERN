import productModel from "../models/productModel";

export const getallproduct = async () =>
{
return  await productModel.find();
}

export const seedinitialproduct = async () =>
{
 try { const products = [
  {
    title: "Grand Theft Auto V",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
    price: 29.99,
    stock: 99,
  },
  {
    title: "Cyberpunk 2077",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    price: 59.99,
    stock: 99,
  },
  {
    title: "Red Dead Redemption 2",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    price: 39.99,
    stock: 99,
  },
  {
    title: "Elden Ring",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    price: 59.99,
    stock: 10,
  },
  {
    title: "God of War",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
    price: 49.99,
    stock: 20,
  },
  {
    title: "Spider-Man Miles Morales",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg",
    price: 49.99,
    stock: 15,
  },
  {
    title: "The Witcher 3",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    price: 19.99,
    stock: 99,
  },
  {
    title: "Hogwarts Legacy",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg",
    price: 59.99,
    stock: 8,
  },
  {
    title: "Call of Duty Modern Warfare III",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/header.jpg",
    price: 69.99,
    stock: 0,
  },
  {
    title: "Baldur's Gate 3",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
    price: 59.99,
    stock: 30,
  },
] 
  const exsitingproduct = await getallproduct();
  if(exsitingproduct.length === 0)
  {
    await productModel.insertMany(products)
  }
}
catch(err)
{
  console.error("can not see database",err)
}
}