import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const navigate = useNavigate();

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Cancel order
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setCancellingId(orderId);

      await api.put(`/orders/${orderId}/cancel`);

      // Update UI immediately
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? { ...order, status: "Cancelled" }
            : order
        )
      );

      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Cancel order failed", error);
      toast.error("Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-gray-500">You haven’t placed any orders yet.</p>;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.orderId}
          className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">
                Order ID:{" "}
                <span className="font-medium">{order.orderId}</span>
              </p>
              <p className="text-sm text-gray-500">
                Date:{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span
              className={`mt-2 md:mt-0 px-3 py-1 text-sm rounded-full font-medium
                ${
                  order.status === "Placed"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }
              `}
            >
              {order.status}
            </span>
          </div>

          {/* Address */}
          <p className="text-sm mb-4">
            <span className="font-semibold">Delivery Address:</span>
            <br />
            <span className="text-gray-600 whitespace-pre-line">
              {order.shippingAdress}
            </span>
          </p>

          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center border rounded-lg p-3"
              >
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/product/${item.productId}`)
                  }
                >
                  <p className="font-medium text-gray-800">
                    {item.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-pink-600">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-3">
            <div className="text-lg font-bold">
              Total: ₹{order.totalAmount}
            </div>

            {/* Cancel Button */}
            {order.status === "Placed" && (
              <button
                onClick={() => handleCancelOrder(order.orderId)}
                disabled={cancellingId === order.orderId}
                className={`px-4 py-2 rounded-lg text-white transition
                  ${
                    cancellingId === order.orderId
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }
                `}
              >
                {cancellingId === order.orderId
                  ? "Cancelling..."
                  : "Cancel Order"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
