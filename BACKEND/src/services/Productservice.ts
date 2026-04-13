import games from "../data/games";
import productModel from "../models/productModel";

export const getallproduct = async () =>
{
return  await productModel.find();
}

export const seedinitialproduct = async () =>
{
 try { const products = games;
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