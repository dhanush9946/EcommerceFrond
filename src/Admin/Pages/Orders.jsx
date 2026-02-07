import React, { useEffect, useState } from "react";
import adminApi from "../../services/adminApi"; // ✅ baseURL from outer file

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch orders from backend (filtered by status)
  const fetchOrders = async (status = "All") => {
    try {
      setLoading(true);

      const params =
        status === "All"
          ? {}
          : { status };

      const res = await adminApi.get("/orders", { params });

      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Handle filter click (UI SAME, logic changed)
  const handleFilterChange = (status) => {
    setFilter(status);
    fetchOrders(status);
  };

  // 🔹 Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminApi.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      // Optimistic UI update
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Admin Orders</h2>

      {/* 🔹 FILTER BUTTONS (UNCHANGED UI) */}
      <div className="flex gap-3 mb-6">
        {["All", "Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* 🔹 ORDERS TABLE (UNCHANGED UI) */}
      <table className="w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">User ID</th>
            <th className="p-3 text-left">Items</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                Loading...
              </td>
            </tr>
          ) : orders.length > 0 ? (
            orders.map((o) => (
              <tr key={o.orderId} className="border-t hover:bg-gray-50">
                <td className="p-3">{o.orderId}</td>
                <td className="p-3">{o.userId}</td>

                <td className="p-3">
                  <ul className="space-y-1">
                    {o.items.map((item, i) => (
                      <li key={i}>
                        {item.productName} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>

                <td className="p-3 font-semibold">
                  ₹{o.totalAmount}
                </td>

                <td className="p-3">
                  <select
                    value={o.status}
                    onChange={(e) =>
                      handleStatusChange(o.orderId, e.target.value)
                    }
                    className="px-2 py-1 border rounded-lg"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
