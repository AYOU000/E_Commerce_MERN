import {  Grid } from "@mui/material";
import Container from "@mui/material/Container";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { baseURL } from "../constants/baseURL";
import { BoxError }  from "../components/error";
export const HomePage = () => {
  const [products, setproducts] = useState<Product[]>([]);
  const [error,setErorr] = useState(false)
  useEffect(() => {
    const fetchData =  async()=>
    {
      try{  
      const response =  await fetch(`${baseURL}/product`);
      const data = await response.json();
      setproducts(data);}
      catch {
      setErorr(true);
      }

    }
     fetchData();
  }, []);
  
  if(error)
  {
    return <BoxError/>;
  }
  return (
    <>
      <Container sx={{marginTop:10}}>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {products.slice(0,8).map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex' }}>
              <ProductCard {...p}  />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
