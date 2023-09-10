"use client";

import React, { useEffect, useState } from "react";
import CarouselComp from "./(components)/CarouselComps";
import Product from "./(components)/Products";
import UseIsLoading from "./hooks/UseIsLoading";
import MainLayout from "./layout/MainLayout";

interface Product {
  id: number;
}

const Home = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  const getProducts = async () => {
    UseIsLoading(true);

    const response = await fetch("/api/products");
    const prods: Product[] = await response.json();

    setProducts([]);
    setProducts(prods);
    UseIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <MainLayout>
      <CarouselComp />

      <div className="max-w-[1200px] mx-auto">
        <div className="text-2xl font-bold mt-4 mb-6 px-4">Products</div>

        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
