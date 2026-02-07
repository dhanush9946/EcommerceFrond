




import React, { useContext, useMemo, useEffect } from "react";
import { CartContext } from "../../context/CreateContext";
import { useNavigate } from "react-router-dom";

const EMPTY_CART = []; // ✅ stable reference

function CartPage() {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ stable cart reference
  const cart = cartContext?.cart ?? EMPTY_CART;

  const increaseQty = cartContext?.increaseQty;
  const decreaseQty = cartContext?.decreaseQty;
  const removeFromCart = cartContext?.removeFromCart;
  const clearCart = cartContext?.clearCart;
  const loadCart = cartContext?.loadCart;

  // Load cart on page open
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && loadCart) {
      loadCart();
    }
  }, [loadCart]);

  // ✅ useMemo dependency is now stable
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);
  

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.productId}>
              <div
                key={item.productId}
                className="flex items-center bg-white shadow-md rounded-xl p-5"
              >
                <img
                  src={item.imageUrl || "https://via.placeholder.com/120"}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.productName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        decreaseQty?.(item.productId, item.quantity)
                      }
                      className="px-3 py-1 bg-gray-200 rounded-lg"
                    >
                      −
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty?.(item.productId)
                      }
                      className="px-3 py-1 bg-gray-200 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() =>
                      removeFromCart?.(item.productId)
                    }
                    className="mt-3 text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-800">
                ₹{totalPrice}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => clearCart?.()}
                className="px-5 py-2 bg-gray-700 text-white rounded-lg"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;

