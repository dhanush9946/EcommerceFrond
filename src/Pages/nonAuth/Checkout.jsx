import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CreateContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from 'react-hot-toast'

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
  try {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all fields");
      return;
    }

    // 1️⃣ Create Order
    const orderRes = await api.post("/orders/checkout", {
      shippingAddress: form.address,
      paymentMethod: form.paymentMethod
    });

    const { orderId, totalAmount } = orderRes.data;

    // 2️⃣ Mock Payment API
    await api.post("/payments", {
      orderId,
      amount: totalAmount,
      method: form.paymentMethod
    });

    toast.success("Order placed successfully 🎉");
    clearCart();
    navigate("/order-success");

  } catch (error) {
    console.error(error);
    toast.error("Checkout failed");
  }
};


  return (
    <div className="p-6 md:p-12">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          ></textarea>

          <div>
            <label className="block mb-2 font-medium">Payment Method</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>
                  {item.name} x {item.qty || 1}
                </span>
                <span>₹{item.price * (item.qty || 1)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
