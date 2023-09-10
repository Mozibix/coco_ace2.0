"use client";

import { useRouter } from "next/router"; // Import from "next/router" instead of "next/navigation"
import { createContext, useState, useContext, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartContextProps {
  isItemAdded: boolean;
  getCart: () => Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  isItemAddedToCart: (product: Product) => void;
  cartCount: () => number;
  cartTotal: () => number;
  clearCart: () => void;
}

const Context = createContext<CartContextProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const router = useRouter();

  const [isItemAdded, setIsItemAdded] = useState(false);

  const getCart = (): Product[] => {
    let cart: Product[] = [];
    if (typeof localStorage !== "undefined") {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        cart = JSON.parse(cartData);
      }
    }
    return cart;
  };

  const addToCart = (product: Product): void => {
    if (typeof localStorage !== "undefined") {
      const cartData = localStorage.getItem("cart");
      let cart: Product[] = cartData ? JSON.parse(cartData) : [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      isItemAddedToCart(product);
      router.reload();
    }
  };

  const removeFromCart = (product: Product): void => {
    if (typeof localStorage !== "undefined") {
      const cartData = localStorage.getItem("cart");
      let cart: Product[] = cartData ? JSON.parse(cartData) : [];
      cart = cart.filter((item) => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      isItemAddedToCart(product);
      router.reload();
    }
  };

  const isItemAddedToCart = (product: Product): void => {
    if (typeof localStorage !== "undefined") {
      const cartData = localStorage.getItem("cart");
      let cart: Product[] = cartData ? JSON.parse(cartData) : [];
      const found = cart.some((item) => item.id === product.id);
      setIsItemAdded(found);
    }
  };

  const cartCount = (): number => {
    if (typeof localStorage !== "undefined") {
      const cartData = localStorage.getItem("cart");
      let cart: Product[] = cartData ? JSON.parse(cartData) : [];
      return cart.length;
    }
    return 0;
  };

  const cartTotal = (): number => {
    if (typeof localStorage !== "undefined") {
      const cartData = localStorage.getItem("cart");
      let cart: Product[] = cartData ? JSON.parse(cartData) : [];
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
      }
      return total;
    }
    return 0;
  };

  const clearCart = (): void => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("cart");
      router.reload();
    }
  };

  const exposed: CartContextProps = {
    isItemAdded,
    getCart,
    addToCart,
    removeFromCart,
    isItemAddedToCart,
    cartCount,
    cartTotal,
    clearCart,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useCart = (): CartContextProps
