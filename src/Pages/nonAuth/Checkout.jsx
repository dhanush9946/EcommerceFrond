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

    // 1️⃣ Create Order (Your backend order)
    // 1️⃣ Create Order (Your backend order)
    const orderRes = await api.post("/orders/checkout", {
      shippingAddress: form.address,
      paymentMethod: form.paymentMethod
    });

    // Backend returns { OrderId: "..." } or { orderId: "..." } but NOT totalAmount
    const orderId = orderRes.data.orderId || orderRes.data.OrderId;
    const amountToPay = totalPrice;

    // 🔹 CASE 1: COD
    if (form.paymentMethod === "cod") {
      await api.post("/payments", {
        orderId,
        amount: amountToPay,
        method: "cod"
      });

      toast.success("Order placed successfully 🎉");
      clearCart();
      navigate("/order-success");
      return;
    }

    // 🔹 CASE 2: Razorpay
    if (form.paymentMethod === "razorpay") {

      // 2️⃣ Create Razorpay Order
      const razorRes = await api.post("/payments/create-order", {
            amount: amountToPay
            });


      const { orderId: razorOrderId, key, Key } = razorRes.data;
      const razorpayKey = key || Key; // Handle casing

      if (!razorpayKey || razorpayKey === "mock_key") {
         console.warn("Using mock_key or undefined key from backend. Verify backend config.");
      }

      console.log("Razorpay Key:", razorpayKey); 

      const options = {
        key: razorpayKey,
        amount: amountToPay * 100,
        currency: "INR",
        order_id: razorOrderId,
        name: "Zyrz",
        description: "Order Payment",
         prefill: {
        name: form.name,
        contact: "9876543210", // use test-friendly number
      },

        handler: async function (response) {
          // 3️⃣ Verify Payment
          await api.post("/payments", {
            orderId,
            amount: amountToPay,
            method: "Razorpay",
            razorpayDetails: {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            }
          });

          toast.success("Payment successful 🎉");
          clearCart();
          navigate("/order-success");
        },

        theme: {
          color: "#ec4899"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }

  } catch (error) {
    console.error("Checkout failed:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Checkout failed");
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
              <option value="razorpay">Online Payment</option>

            </select>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y">
            {cart.map((item, index) => (
               <li key={`${item.id}-${index}`} className="py-2 flex justify-between">

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
