"use client";

// Import the required modules and components
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/context/cart";
import { toast } from "react-toastify";
import MainLayout from "@/app/layout/MainLayout";
import SimilarProducts from "@/app/(components)/SimilarProducts";
import UseIsLoading from "@/app/hooks/UseIsLoading";

// Define the Product type
interface Product {
  id: number;
  title: string;
  description: string;
  url: string;
  price: number;
  name?: string; // Add the 'name' property if it's required
}

// Define the ProductProps interface
interface ProductProps {
  params: { id: number };
}

export default function Product({ params }: ProductProps) {
  const cart = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProduct = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/product/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const prod: Product = await response.json();
      setProduct(prod);
    } catch (error) {
      console.error(error);
      // Handle error here, e.g., show an error message
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [params.id]);

  const addToCart = () => {
    if (product) {
      if (cart.isItemAdded) {
        cart.removeFromCart(product);
        toast.info("Removed from cart", { autoClose: 3000 });
      } else {
        cart.addToCart(product);
        toast.success("Added to cart", { autoClose: 3000 });
      }
    }
  };

  return (
    <MainLayout>
      <div className="products_id_sec">
        <div className="lg:flex px-4 py-10">
          {product && (
            <img
              className="products_id_sec_image"
              src={product.url}
              alt={product.title}
            />
          )}

          <div className="px-4 mt w-full">
            {isLoading ? (
              <p>Loading...</p>
            ) : product ? (
              <>
                <div className="font-bold text-xl">{product.title}</div>
                <div className="text-sm text-gray-700 pt-2">Brand New</div>

                <div className="border-b py-1" />

                <div className="pt-3 pb-2">
                  <div className="flex items-center">
                    Condition:{" "}
                    <span className="font-bold text-[17px] ml-2">New</span>
                  </div>
                </div>

                <div className="border-b py-1" />

                <div className="pt-3">
                  <div className="w-full text-sm sm:text-lg flex items-center justify-between">
                    <button
                      onClick={addToCart}
                      className={`text-white py-2 px-20 rounded-full cursor-pointer ${
                        cart.isItemAdded(product)
                          ? "bg-[#e9a321] hover:bg-[#bf851a]"
                          : "bg-[#3498C9] hover:bg-[#0054A0]"
                      }`}
                    >
                      {cart.isItemAdded(product)
                        ? "Remove From Cart"
                        : "Add To Cart"}
                    </button>
                  </div>
                </div>

                <div className="border-b py-1" />
              </>
            ) : (
              <p>Product not found.</p>
            )}
          </div>
        </div>
      </div>

      <SimilarProducts />
    </MainLayout>
  );
}
