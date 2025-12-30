// export interface CartState {
//   cart: boolean | null;
//   setCart: React.Dispatch<React.SetStateAction<boolean | null>>;
//   listOfProducts?: ProductCartTypes[];
//   setListOfProduct:null
//   loading: boolean | null;
//   productDetails: null;
//   setProductDetails: null;
// }

//   my initial code

//   const handleAddToCart = (product: ProductCartTypes) => {
//     // console.log("Added to cart:", product);

//     let ExisitingCartItems = [...cart];
//     const findIndexOfCurrentItem = ExisitingCartItems.findIndex(
//       (cart) => cart.id
//     );

//     if (findIndexOfCurrentItem == -1) {
//       ExisitingCartItems.push({
//         ...product,
//         quantity: 1,
//         totalPrice: product.price,
//       });
//     } else {
//       console.log("its coming here");
//     }

//     setCart(ExisitingCartItems);
//     localStorage.setItem("cart", JSON.stringify(ExisitingCartItems));
//     navigate("/cart");

//     console.log(ExisitingCartItems);

//     console.log(findIndexOfCurrentItem);
//   };

import { createContext, useState, useEffect } from "react";
import type { ProductCartTypes } from "../types/ProductCartTypes";
import { useNavigate } from "react-router-dom";

export interface CartState {
  cart: ProductCartTypes[];
  setCart: React.Dispatch<React.SetStateAction<ProductCartTypes[]>>;

  listOfProducts: ProductCartTypes[];
  setListOfProduct: React.Dispatch<React.SetStateAction<ProductCartTypes[]>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  productDetails: ProductCartTypes | null;
  setProductDetails: React.Dispatch<
    React.SetStateAction<ProductCartTypes | null>
  >;

  handleAddToCart: (product: ProductCartTypes) => void;
  handleRemoveFromCart: (
    product: ProductCartTypes,
    isFullyRemovedFromCart: boolean
  ) => void;
}

export const shoppingCart = createContext<CartState>({
  cart: [],
  setCart: () => {},
  listOfProducts: [],
  setListOfProduct: () => {},
  loading: true,
  setLoading: () => {},
  productDetails: null,
  setProductDetails: () => {},
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
});

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<ProductCartTypes[]>([]);
  const [listOfProducts, setListOfProduct] = useState<ProductCartTypes[]>([]);
  const [productDetails, setProductDetails] = useState<ProductCartTypes | null>(
    null
  );

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    if (data?.products) {
      setListOfProduct(data.products);
      setLoading(false);
    }
  };

  const handleAddToCart = (product: ProductCartTypes) => {
    const existingCartItems = [...cart];

    const index = existingCartItems.findIndex((item) => item.id === product.id);

    if (index === -1) {
      existingCartItems.push({
        ...product,
        quantity: 1,
        totalPrice: product.price,
      });
    } else {
      const existing = existingCartItems[index];
      const newQuantity = existing.quantity + 1;

      existingCartItems[index] = {
        ...existing,
        quantity: newQuantity,
        totalPrice: newQuantity * existing.price,
      };
    }

    setCart(existingCartItems);
    localStorage.setItem("cart", JSON.stringify(existingCartItems));
    navigate("/cart");
  };

  const handleRemoveFromCart = (
    product: ProductCartTypes,
    isFullyRemovedFromCart: boolean
  ) => {
    const existingCartItems = [...cart];
    const index = existingCartItems.findIndex((item) => item.id === product.id);

    if (index === -1) return;

    if (isFullyRemovedFromCart) {
      existingCartItems.splice(index, 1);
    } else {
      const existing = existingCartItems[index];
      const newQuantity = existing.quantity - 1;

      if (newQuantity <= 0) {
        existingCartItems.splice(index, 1);
      } else {
        existingCartItems[index] = {
          ...existing,
          quantity: newQuantity,
          totalPrice: newQuantity * existing.price,
        };
      }
    }

    setCart(existingCartItems);
    localStorage.setItem("cart", JSON.stringify(existingCartItems));
  };

  useEffect(() => {
    fetchProducts();

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
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
        setListOfProduct,
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >
      {children}
    </shoppingCart.Provider>
  );
}
