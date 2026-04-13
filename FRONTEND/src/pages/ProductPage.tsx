import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { baseURL } from "../constants/baseURL";
import { BoxError } from "../components/error";
import { SearchBar } from "../components/SearchBar";
import Pagintion from "../components/Pagintion";
export const ProductPage = () => {
  const [products, setproducts] = useState<Product[]>([]);
  const [error, setErorr] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const postforpage = 20;
  const lastpostindex = currentPage * postforpage;
  const firstpostindex = lastpostindex - postforpage;
  const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/product`);
        const data = await response.json();
        setproducts(data);
      } catch {
        setErorr(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <BoxError />;
  }
  useEffect(() => {
  setcurrentPage(1);
}, [query]);
const filtered = query === ""
  ? products 
  : products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <>
      <Container sx={{ marginTop: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <SearchBar onSearch={setQuery} />
        </Box>{" "}
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {filtered.slice(firstpostindex, lastpostindex).map((p) => (
            <Grid
              key={p._id}
              size={{ xs: 12, sm: 6, md: 3 }}
              sx={{ display: "flex" }}
            >
              <ProductCard {...p} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
          <Pagintion
            totalPosts={filtered.length}
            postsForpage={postforpage}
            currentPage={currentPage}
            setCurrentPage={setcurrentPage}
          />
        </Box>
      </Container>
    </>
  );
};
