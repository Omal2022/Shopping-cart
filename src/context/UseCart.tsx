import { shoppingCart } from "./ShoppingCartContext";
import { useContext } from "react";

export const useCart = () => {

const context = useContext(shoppingCart)

if(!context) {
    throw new Error ("useCart must be used within shoppingCart")
}

return context
}