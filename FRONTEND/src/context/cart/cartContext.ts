import { createContext, useContext } from "react";
import type { cartItem } from "../../types/cartItems";

interface CartContextType {
  cartItems:cartItem[];
  totalAmount: number;
  addItemToCart:  (ProductId:string ) => void;
}

export const CartContext = createContext<CartContextType>({
    cartItems:[],
    totalAmount:0,
    addItemToCart :() => {}

});

export const useCart = () => useContext(CartContext);
