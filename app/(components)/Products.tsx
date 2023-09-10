/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

interface IProp {
  product: any;
}

const Product: React.FC<IProp> = ({ product }) => {
  return (
    <>
      <Link
        href={`/product/${product?.id}`}
        className="w-[20rem] h-[26rem] overflow-hidden p-1.5 border border-gray-50 hover:border-gray-200 hover:shadow-xl bg-gray-100 rounded mx-auto"
      >
        {product?.url ? (
          <img
            className="rounded cursor-pointer w-full h-[20rem]"
            src={product.url}
            alt={product?.title}
          />
        ) : (
          <></>
        )}

        <div className="pt-10 px-1">
          <div className="font-semibold text-center text-[1rem] hover:underline cursor-pointer">
            {product?.title}
          </div>
          {/*
          <div className="font-extrabold">
            ${(product?.price / 100).toFixed(2)}
          </div>

           <div className="relative flex items-center text-[12px] text-gray-500">
            <div className="line-through">
              ${((product?.price * 1.2) / 100).toFixed(2)}
            </div>
            <div className="px-2">-</div>
            <div className="line-through">20%</div>
          </div> */}
        </div>
      </Link>
    </>
  );
};

export default Product;
