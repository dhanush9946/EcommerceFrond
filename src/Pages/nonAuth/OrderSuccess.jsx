import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-lg">
        
        <CheckCircle className="mx-auto text-green-500" size={72} />

        <h1 className="text-2xl font-bold mt-4">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been confirmed and will be
          processed soon.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full border py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
