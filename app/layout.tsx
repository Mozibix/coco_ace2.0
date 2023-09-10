import "./globals.css";
import "./styles/custom.scss";
import UserProvider from "./context/user";
import CartProvider from "./context/cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Ecommerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />

        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
