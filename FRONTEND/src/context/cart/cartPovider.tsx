import {  useState, type FC, type PropsWithChildren } from "react";
import type { cartItem } from "../../types/cartItems";
import { CartContext } from "./cartcontext";


const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const[cartItems,setcartitems] = useState<cartItem[]>([]);
    const[totalAmount,settotalAmount] = useState<number>(0);
  
    const addItemToCart = (productId: string) =>
    {
      console.log(productId)
    }
    
    return (   
      < CartContext.Provider  value = {{cartItems ,totalAmount,addItemToCart}}>
        {children}
       </ CartContext.Provider>
    )
}
export default CartProvider;