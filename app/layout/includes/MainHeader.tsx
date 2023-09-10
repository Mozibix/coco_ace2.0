"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect } from "react";
import { useCart } from "../../context/cart";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    cart.cartCount();
  }, [cart]);

  return (
    <>
      <div className="nav">
        <div className="nav_inner">
          <div
            onClick={() => router.push("/")}
            className="logo cursor-pointer fw_700"
          >
            <img className="img" src="/logo.png" alt="logo" />
            CocoAce Kollectibles
          </div>

          <div className="social">
            <div className="social_icon">
              <a href="https://api.whatsapp.com/send?phone=2349023019070&text=hello20%my20%name20%is ">
                <img className="img" src="/whatsapp.gif" alt="whatsapp" />
              </a>
            </div>
            <div className="px-3 hover:underline cursor-pointer">
              <div onClick={() => router.push("/cart")} className="relative">
                <AiOutlineShoppingCart size={22} />
                {cart.cartCount() > 0 ? (
                  <>
                    <div className="absolute text-[10px] -top-[2px] -right-[5px] bg-red-500 w-[14px] h-[14px] rounded-full text-white">
                      <div className=" flex items-center justify-center -mt-[1px]">
                        {cart.cartCount()}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
