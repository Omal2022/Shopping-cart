import React, { useContext } from "react";
import { shoppingCart } from "../../context/ShoppingCartProvider";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export const CartListPage = () => {
  const { cart, handleAddToCart, handleRemoveFromCart } =
    useContext(shoppingCart);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  return (
    <section className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left - Order Summary */}
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-20 h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="flex flex-col gap-2 mb-4">
            {cart.length ? (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <p className="text-gray-700">{item.title}</p>
                  <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items in cart</p>
            )}
          </div>

          <div className="border-t border-gray-300 pt-4">
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Button onClick={() => alert("Checkout not implemented yet")}>
              Checkout
            </Button>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          </div>
        </div>

        {/* Right - Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          {cart.length ? (
            cart.map((singleCartItem) => (
              <div
                key={singleCartItem.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={singleCartItem.thumbnail}
                  alt={singleCartItem.title}
                  className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded"
                />

                <div className="flex-1 flex flex-col">
                  <p className="font-semibold">{singleCartItem.title}</p>
                  <p className="text-gray-600">
                    Quantity: {singleCartItem.quantity}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-content-center gap-4 sm:gap-5">
                  <p className="font-bold">
                    ${singleCartItem.totalPrice.toFixed(2)}
                  </p>

                  <div className="mt-3 sm:mt-0 flex flex-row sm:flex-col gap-2">
                    <Button
                      bgColor="transparent"
                      clsName="border border-[#000] w-10 "
                      txtColor="black"
                      onClick={() => handleAddToCart(singleCartItem)}
                    >
                      +
                    </Button>
                    <Button
                      bgColor="transparent"
                      clsName="border border-[#000] w-10 disable:opacity-65 "
                      txtColor="black"
                      onClick={() =>
                        handleRemoveFromCart(singleCartItem, false)
                      }
                      disabled={singleCartItem.quantity === 1}
                    >
                      -
                    </Button>
                  </div>

                  <Button
                    clsName="w-full sm:w-30 h-13"
                    onClick={() =>
                      handleRemoveFromCart(singleCartItem, true)
                    }
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-xl text-gray-500">
              No items available in cart
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};
