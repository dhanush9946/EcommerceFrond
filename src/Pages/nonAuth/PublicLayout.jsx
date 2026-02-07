import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../common/nav-bar/NavigationBar";
import Footer from "../common/footer/Footer";
import CartProvider from "../../context/CartProvider";
import WishListProvider from "../../context/WishListProvider";

const PublicLayout = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  // 🔹 Only mount providers if logged in
  const content = (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );

  if (!isLoggedIn) {
    return content;
  }

  return (
    <CartProvider>
      <WishListProvider>
        {content}
      </WishListProvider>
    </CartProvider>
  );
};

export default PublicLayout;
