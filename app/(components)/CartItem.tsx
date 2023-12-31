"use client";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
import React from "react"; // Import React if it's not already imported in your file

interface IProps {
  product: any;
}

const CartItem: React.FC<IProps> = ({ product }) => {
  const cart = useCart();

  const removeItemFromCart = () => {
    let res = confirm(
      `Are you sure you want to remove this? "${product.title}"`
    );
    if (res) {
      // cart.removeFromCart(product);
      toast.info("Removed from cart", { autoClose: 3000 });
    }
  };

  return (
    <>
      <div className="relative flex sm:gap-4 justify-start my-2 border w-full p-1">
        <img
          src={product?.url + "/150"}
          className="rounded-md w-[150px] h-[150px]"
        />

        <div className="overflow-hidden pl-2 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center font-semibold justify-between w-[400px] text-[16px] underline">
              {product?.title}
            </div>
            {/* <div className="font-bold text-lg">
              ${(product?.price / 100).toFixed(2)}
            </div> */}
          </div>

          <div className="font-semibold text-blue-500 mt-2">NEW</div>

          {/* <div className="text-sm mt-2">
            {product?.description.substring(0, 150)}...
          </div> */}

          <div className="absolute right-0 bottom-0 p-4 text-sm">
            <button
              onClick={() => removeItemFromCart()}
              className="underline text-blue-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
