"use client";

import { useState, useEffect } from "react";
import ProductComp from "./Products";
import { BiLoader } from "react-icons/bi";

interface Product {
  id: number;
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
        <div className="border-b p-4 max-w-[1200px] mx-auto" />

        <div className="max-w-[1200px] mx-auto">
          <div className="font-bold text-2xl px-4  mt-4">Similar items</div>

          {products.length > 0 ? (
            <>
              <div className="similar_products_container">
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
