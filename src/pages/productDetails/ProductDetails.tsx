import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shoppingCart } from "../../context/ShoppingCartProvider";
import { Button } from "../../components/Button";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleAddToCart,
  } = useContext(shoppingCart)!;

  const fetchProductDetails = async () => {
    setLoading(true);

    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();

    if (data) {
      setProductDetails(data);
    }

    setLoading(false);
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

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl text-gray-600">
        Fetching Product Details, please wait...
      </h1>
    );
  }

  //   const handleGoToCart = () => {
  //     navigate("/cart");
  //   };

  return (
    <section className="p-8 flex justify-center bg-gray-50 min-h-screen">
      {productDetails.id ? (
        <div className="flex gap-12 max-w-6xl w-full bg-white rounded-xl shadow-md p-8">
          {/* LEFT – Product Image */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-3xl font-semibold text-gray-900">
              {productDetails.title}
            </h1>

            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productDetails.thumbnail}
                alt={productDetails.title}
                className="w-full h-[480px] object-cover"
              />
            </div>
          </div>

          {/* RIGHT – Product Info */}
          <div className="flex-1 flex flex-col gap-6 relative top-30">
            {/* Thumbnails */}
            <div className="flex gap-3">
              {productDetails.images?.map((img: string) => (
                <div
                  key={img}
                  className="border rounded-lg p-1 hover:border-gray-800 transition cursor-pointer"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {productDetails.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${productDetails.price}
              </span>
              <span className="text-sm text-green-600 font-medium">
                In stock
              </span>
            </div>

            {/* CTA */}
            <div className="mt-4">
              <Button
                clsName="cursor-pointer"
                onClick={() => handleAddToCart(productDetails)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="mt-10 text-2xl text-red-500 font-extrabold">
            Page Not Found
          </h1>
          <img src="/58420911_9264744.svg" alt="" width={700} />
        </div>
      )}
    </section>
  );
};
