"use client";

import { useRouter } from "next/navigation"; // Updated import path
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react"; // Added useEffect for initial load

interface Product {
  id: number;
  name: string;
  price: number;
  // Add other properties as needed
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  isItemAdded: boolean;
  getCart: () => CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  isItemAddedToCart: (product: Product) => void;
  cartCount: () => number;
  cartTotal: () => number;
  clearCart: () => void;
}

const Context = createContext<CartContextType | undefined>(undefined);
interface ProviderProps {
  children: ReactNode; // Define children prop with the ReactNode type
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  // Added React.FC for children
  const router = useRouter();

  const [isItemAdded, setIsItemAdded] = useState<boolean>(false);

  useEffect(() => {
    isItemAddedToCart(); // Initialize isItemAdded on component load
  }, []);

  const getCart = (): CartItem[] => {
    let cart: CartItem[] = [];
    if (typeof localStorage !== "undefined") {
      cart = JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return cart;
  };

  const addToCart = (product: Product): void => {
    let cart: CartItem[] = getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    isItemAddedToCart(product);
    router.refresh(); // Updated router refresh method
  };

  const removeFromCart = (product: Product): void => {
    let cart: CartItem[] = getCart();
    cart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    isItemAddedToCart(product);
    router.refresh(); // Updated router refresh method
  };

  const isItemAddedToCart = (product?: Product): void => {
    let cart: CartItem[] = getCart();

    if (product) {
      const found = cart.some((item) => item.id === product.id);
      setIsItemAdded(found);
    } else {
      setIsItemAdded(cart.length > 0);
    }
  };

  const cartCount = (): number => {
    let cart: CartItem[] = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const cartTotal = (): number => {
    let cart: CartItem[] = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = (): void => {
    localStorage.removeItem("cart");
    router.refresh(); // Updated router refresh method
  };

  const exposed = {
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

export const useCart = (): CartContextType => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default Provider;
