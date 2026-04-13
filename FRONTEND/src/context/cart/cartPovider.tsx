import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import type { cartItem } from "../../types/cartItems";
import { baseURL } from "../../constants/baseURL";
import { CartContext } from "./cartContext";
import { useAuth } from "../auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setcartitems] = useState<cartItem[]>([]);
  const [totalAmount, settotalAmount] = useState<number>(0);
  const [error, setError] = useState("");
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
        const { items, totalAmount } = await response.json();
        if (!items) {
          setError("failed to parse cart data");
        }
        const cartItemMap = items.map(
          ({
            product,
            quantity,
          }: {
            product: {
              _id: string;
              title: string;
              image: string;
              price: number;
            };
            quantity: number;
          }) => ({
            ProductId: product._id,
            title: product.title,
            image: product.image,
            quantity,
            unitPrice: product.price,
          }),
        );
        setcartitems(cartItemMap);
        settotalAmount(totalAmount);
      } catch {
        setError("failed to parse cart data");
      }
      if(error)
      {
        console.log(error);
        return;
      }
    };
    fetchData();
  }, [token]);
  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${baseURL}/cart/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (!response.ok) {
        setError("failed to add to card");
      }
      const { items, totalAmount } = await response.json();
      if (!items) {
        setError("failed to parse cart data");
      }
      const cartItemMap = items.map(
        ({
          product,
          quantity,
        }: {
          product: { _id: string; title: string; image: string; price: number };
          quantity: number;
        }) => ({
          ProductId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.price,
        }),
      );
      setcartitems([...cartItemMap]);
      settotalAmount(totalAmount);
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
