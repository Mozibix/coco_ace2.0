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

      <div className="products_sec">
        <div>
          <div className="text-2xl lg:text-3xl uppercase font-bold mt-4 mb-6 px-4">
            Products
          </div>

          <div className="products_container">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
