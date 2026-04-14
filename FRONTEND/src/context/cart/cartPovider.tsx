import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import type { cartItem } from "../../types/cartItems";
import { baseURL } from "../../constants/baseURL";
import { CartContext } from "./cartcontext";
import { useAuth } from "../auth/AuthContext";

type CartProduct = {
  product: { _id: string; title: string; image: string; price: number };
  quantity: number;
};

const mapCartItems = (items: CartProduct[]) =>
  items.map(({ product, quantity }) => ({
    ProductId: product._id,
    title: product.title,
    image: product.image,
    quantity,
    unitPrice: product.price,
  }));

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const { items, totalAmount } = await response.json();
        setCartItems(mapCartItems(items));
        setTotalAmount(totalAmount);
      } catch (err) {
        console.error(err);
        setError("failed to fetch cart");
      }
    };
    fetchData();
  }, [token]);

  const updateCartState = (items: CartProduct[], totalAmount: number) => {
    setCartItems(mapCartItems(items));
    setTotalAmount(totalAmount);
  };

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
      if (!response.ok) { setError("failed to add item"); return; }
      const { items, totalAmount } = await response.json();
      updateCartState(items, totalAmount);
    } catch {
      setError("Something went wrong");
    }
  };

  const deleteItemfromCart = async (productId: string) => {
    try {
      const response = await fetch(`${baseURL}/cart/item/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) { setError("failed to delete item"); return; }
      const { items, totalAmount } = await response.json();
      updateCartState(items, totalAmount);
    } catch {
      setError("Something went wrong");
    }
  };

  const decreaseQuantity = async (productId: string) => {
    try {
      const response = await fetch(`${baseURL}/cart/item/decrease`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) { setError("failed to decrease quantity"); return; }
      const { items, totalAmount } = await response.json();
      updateCartState(items, totalAmount);
    } catch {
      setError("Something went wrong");
    }
  };

  const increaseQuantity = async (productId: string) => {
    try {
      const response = await fetch(`${baseURL}/cart/item/increase`, { // ← fixed
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) { setError("failed to increase quantity"); return; }
      const { items, totalAmount } = await response.json();
      updateCartState(items, totalAmount);
    } catch {
      setError("Something went wrong");
    }
  };
  const checkout = async() =>
  {
    try {
      const response = await fetch(`${baseURL}/order`, { 
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (!response.ok) { setError("failed to checkout"); return; }
      updateCartState([],0)
    } catch {
      setError("Something went wrong");
    }
  }
  const cleancart = async() =>
  {
    try {
      const response = await fetch(`${baseURL}/cart`, { 
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (!response.ok) { setError("failed to clean cart"); return; }
      updateCartState([],0)
    } catch {
      setError("Something went wrong");
    }
  }
  return (
    <CartContext.Provider value={{ cartItems, totalAmount , error, addItemToCart, deleteItemfromCart, decreaseQuantity, increaseQuantity,checkout,cleancart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;