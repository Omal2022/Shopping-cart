import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { type ProductCartTypes } from "../../types/ProductCartTypes";

interface ProductCardProps {
  listOfProduct: ProductCartTypes;
  className?: string;
}

export const ProductCard = ({ listOfProduct, className }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleNavigateToSingleProduct = (getCurrentProductID) => {
    navigate(`/product-details/${getCurrentProductID}`);
// console.log(getCurrentProductID, navigate)
  };

  return (
    <>
      <div key={listOfProduct.id} className="relative">
        <div className={className}>
          <div className="bg-amber-900 p-1 rounded absolute left-4  top-4">
            <p className="text-[7px] font-bold text-white">
              {listOfProduct.category.toUpperCase()}
            </p>
          </div>
          <div className="overflow-hidden aspect-w-1 aspect-h-1 ">
            <img
              src={listOfProduct.thumbnail}
              alt=""
              className=" w-full h-full transition-all duration-300 hover:scale-125"
            />
          </div>
          <p className="font-bold text-center">{listOfProduct.title}</p>
          <p>${listOfProduct.price}</p>
          <Button clsName="rounded" onClick={() => handleNavigateToSingleProduct(listOfProduct.id)}>
            View Details
          </Button>
        </div>
      </div>
    </>
  );
};
