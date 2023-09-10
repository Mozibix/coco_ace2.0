"use client";

import { useState, useEffect } from "react";
import ProductComp from "./Products";
import { BiLoader } from "react-icons/bi";

interface Product {
  id: number;
  // Define the other properties of your Product type here
}

export default function SimilarProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const getRandomProducts = async () => {
    try {
      const response = await fetch("/api/products/get_random");
      const result: Product[] = await response.json();

      if (result) {
        setProducts(result);
        return;
      }

      setProducts([]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <>
      <div>
        <div className="border-b py-1 max-w-[1200px] mx-auto" />

        <div className="max-w-[1200px] mx-auto">
          <div className="font-bold text-2xl py-2 mt-4">
            Similar sponsored items
          </div>

          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-5 gap-4">
                {products.map((product) => (
                  <ProductComp key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center gap-4 font-semibold">
                  <BiLoader size={30} className="text-blue-400 animate-spin" />
                  Loading Products...
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
