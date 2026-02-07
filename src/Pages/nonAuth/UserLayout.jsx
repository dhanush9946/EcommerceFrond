import React from "react";
import { Outlet } from "react-router-dom";

import CartProvider from "../../context/CartProvider";
import WishListProvider from "../../context/WishListProvider";
import NavigationBar from "../common/nav-bar/NavigationBar";
import Footer from "../common/footer/Footer";

const UserLayout = () => {
  return (
    <CartProvider>
      <WishListProvider>
        <NavigationBar />
        <Outlet />
        <Footer />
      </WishListProvider>
    </CartProvider>
  );
};

export default UserLayout;
