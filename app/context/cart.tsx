"use client";

import { useRouter } from "next/navigation";
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
      cart = JSON.parse(localStorage.getItem("cart")) || "";
    }
    return cart;
  };

  const addToCart = (product: Product): void => {
    let cart: Product[] = [];
    if (typeof localStorage !== "undefined") {
      cart = JSON.parse(localStorage.getItem("cart")) || "";
    }
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    isItemAddedToCart(product);
    router.refresh();
  };

  const removeFromCart = (product: Product): void => {
    let cart: Product[] = [];
    if (typeof localStorage !== "undefined") {
      cart = JSON.parse(localStorage.getItem("cart")) || "";
    }
    cart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    isItemAddedToCart(product);
    router.refresh();
  };

  const isItemAddedToCart = (product: Product): void => {
    let cart: Product[] = [];
    if (typeof localStorage !== "undefined") {
      cart = JSON.parse(localStorage.getItem("cart")) || "";
    }
    cart = cart.filter((item) => item.id === product.id);

    if (cart.length > 0) {
      setIsItemAdded(true);
      return;
    }

    setIsItemAdded(false);
  };

  const cartCount = (): number => {
    let cart: Product[] = [];
    if (typeof localStorage !== "undefined") {
      cart = JSON.parse(localStorage.getItem("cart")) || "";
    }
    return cart.length;
  };

  const cartTotal = (): number => {
    let total = 0;
    let cart: Product[] = [];
    if (typeof localStorage !== "undefined") {
      cart = JSON.parse(localStorage.getItem("cart")) || "";
    }
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      total += element.price;
    }

    return total;
  };

  const clearCart = (): void => {
    localStorage.removeItem("cart");
    router.refresh();
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

export const useCart = (): CartContextProps => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default Provider;
