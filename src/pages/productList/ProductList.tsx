import { useContext } from "react";
import { shoppingCart } from "../../context/ShoppingCartProvider";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const { listOfProducts, loading } = useContext(shoppingCart)!;

  if (loading)
    return (
      <h1 className="text-center mt-10 text-xl">
        Loading Data, please wait...
      </h1>
    );

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Featured Products</h1>

      {listOfProducts.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {listOfProducts.map((product) => (
            <ProductCard
              key={product.id}
              listOfProduct={product}
              className="bg-neutral-300 p-4 rounded-lg shadow-md flex flex-col items-center w-64"
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-xl mt-10">No Products to Load</h1>
      )}
    </section>
  );
};
