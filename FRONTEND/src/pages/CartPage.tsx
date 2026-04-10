import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { baseURL } from "../constants/baseURL";
import { useAuth } from "../context/auth/AuthContext";
export const CartPage = () => {
  const { token } = useAuth();
  const [cart, setcart] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setcart(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, [token]);
  console.log({ cart });
  if (error) {
    return ;
  }
  return (
    <>
      <Container sx={{ marginTop: 10 }}>
        <p>my new cart</p>
      </Container>
    </>
  );
};

export default CartPage;
