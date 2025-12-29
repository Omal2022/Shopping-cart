import { createContext, useState, useEffect } from "react";
import type { ProductCartTypes } from "../types/ProductCartTypes";

// export interface CartState {
//   cart: boolean | null;
//   setCart: React.Dispatch<React.SetStateAction<boolean | null>>;
//   listOfProducts?: ProductCartTypes[];
//   setListOfProduct:null
//   loading: boolean | null;
//   productDetails: null;
//   setProductDetails: null;
// }

export interface CartState {
  cart: boolean | null;
  setCart: React.Dispatch<React.SetStateAction<boolean | null>>;
  listOfProducts: ProductCartTypes[];
  setListOfProduct: React.Dispatch<React.SetStateAction<ProductCartTypes[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  productDetails: ProductCartTypes | null;
  setProductDetails: React.Dispatch<
    React.SetStateAction<ProductCartTypes | null>
  >;
}

export const shoppingCart = createContext<CartState>({
  cart: null,
  setCart: () => {},
  listOfProducts: [],
  setListOfProduct: () => {},
  loading: true,
  setLoading: () => {},
  productDetails: null,
  setProductDetails: () => {},
});

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<boolean | null>(null);
  const [listOfProducts, setListOfProduct] = useState<ProductCartTypes[]>([]);
  const [productDetails, setProductDetails] = useState<null>(null);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    if (data?.products) {
      setListOfProduct(data.products);
      setLoading(!true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <shoppingCart.Provider
      value={{
        cart,
        setCart,
        loading,
        setLoading,
        productDetails,
        setProductDetails,
        listOfProducts,
      }}
    >
      {children}
    </shoppingCart.Provider>
  );
}
