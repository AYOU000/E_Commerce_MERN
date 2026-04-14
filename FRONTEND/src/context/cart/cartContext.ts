import { createContext, useContext } from "react";
import type { cartItem } from "../../types/cartItems";

interface CartContextType {
  cartItems:cartItem[];
  totalAmount: number;
   error: string
  addItemToCart:  (ProductId:string ) => void;
  deleteItemfromCart:  (ProductId:string ) => void;
  decreaseQuantity:(ProductId:string) => void
  increaseQuantity:(ProductId:string) => void
  checkout:() => void 
  cleancart:() => void
}

export const CartContext = createContext<CartContextType>({
    cartItems:[],
    totalAmount:0,
     error:"",
    addItemToCart :() => {},
    deleteItemfromCart:() => {},
    decreaseQuantity:() => {},
    increaseQuantity:() => {},
    checkout:() => {} ,
    cleancart:() => {}
});

export const useCart = () => useContext(CartContext);
