import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { shoppingCart } from "../../context/ShoppingCartProvider";

export const ProductDetails = () => {
  const { id } = useParams();
  const { productDetails, setProductDetails } = useContext(shoppingCart)!;

  const fetchProductDetails = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    if (data) setProductDetails(data);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!productDetails)
    return (
      <h1 className="text-center mt-10 text-xl text-gray-600">
        Loading Product, please wait...
      </h1>
    );

  return (
    <section className="p-6 flex justify-center">
      {productDetails.id ? (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {productDetails.title}
          </h1>
          <img
            src={productDetails.thumbnail}
            alt={productDetails.title}
            className="mb-4 rounded-lg shadow-md w-full object-cover"
          />
          <p className="text-gray-700 text-lg text-center">
            {productDetails.description}
          </p>
        </div>
      ) : (
        <div>

        <h1 className="text-center mt-10 text-2xl text-red-500 font-extrabold">
          Page Not Found
        </h1>
        <img src="/58420911_9264744.svg" alt="" width={700}/>
        </div>
      )}
    </section>
  );
};
