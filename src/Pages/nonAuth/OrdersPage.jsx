import React from "react";
import NavigationBar from "../common/nav-bar/NavigationBar";
import OrdersList from "./OrderList";

export default function OrdersPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
      <NavigationBar />

      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          My Orders
        </h2>

        <OrdersList />
      </div>
    </div>
  );
}
