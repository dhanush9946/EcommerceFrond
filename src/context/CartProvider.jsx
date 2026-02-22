import React, { useEffect, useState, useCallback } from "react";
import { CartContext } from "./CreateContext";
import toast from "react-hot-toast";
import api from "../services/api";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 🔹 Load cart
  const loadCart = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role === "Admin") {
      setCart([]);
      return;
    }

    try {
      const res = await api.get("/user/cart");
      setCart(res.data || []);
    } catch (error) {
      console.error("Load cart failed", error);
    }
  }, []);

  // 🔹 Load on login / refresh
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // 🔹 Add to cart
  const addToCart = async (product) => {
    try {
      const res = await api.post("/user/cart/add", {
        productId: product.id,
        quantity: 1,
      });

      // Optimistic update
      setCart((prev) => [...prev, res.data]);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Please login to add items");
      console.log(error);
    }
  };

  const increaseQty = async (productId) => {
  try {
    await api.put("/user/cart/update-quantity", {
      productId: productId,
      action: "increase",
    });

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } catch (error) {
    console.error(error);
  }
};


  const decreaseQty = async (productId) => {
  // Find the current item quantity
  const item = cart.find((i) => i.productId === productId);
  if (item && item.quantity <= 1) {
    toast.error("Minimum quantity is 1. Remove the item if you don't want it.");
    return;
  }

  try {
    await api.put("/user/cart/update-quantity", {
      productId: productId,
      action: "decrease",
    });

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  } catch (error) {
    console.error(error);
  }
};


  // 🔹 Remove single item
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/user/cart/remove/${productId}`);

      // Optimistic UI update
      setCart((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Remove cart item failed", error);
    }
  };

  // 🔹 Clear cart (BEST VERSION)
const clearCart = async () => {
  try {
    // Optimistic UI clear
    const itemsToRemove = [...cart];
    setCart([]);

    // Delete all items in parallel
    await Promise.all(
      itemsToRemove.map((item) =>
        api.delete(`/user/cart/remove/${item.productId}`)
      )
    );

    toast.success("Cart cleared");
  } catch (error) {
    console.error("Clear cart failed", error);
    toast.error("Failed to clear cart");

    // Rollback UI if something fails
    loadCart();
  }
};


  // 🔹 Used by wishlist → cart
  const addItemToCartState = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loadCart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        addItemToCartState,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
































// import React, { useEffect, useState } from "react";
// import { CartContext } from "./CreateContext";
// import toast from "react-hot-toast";
// import {
//   fetchCart,
//   addCartItem,
//   updateCartQty,
//   removeCartItem,
// } from "../services/cart.api";

// function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   const loadCart = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) return;

//     try {
//       const res = await fetchCart();
//       setCart(res.data || []);
//     } catch (err) {
//       if (err.response?.status === 403) {
//         toast.error("Your account has been blocked");
//         localStorage.clear();
//         window.location.href = "/login";
//       }
//       console.error("Load cart failed", err);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const addToCart = async (product) => {
//     try {
//       await addCartItem(product.id, 1);
//       loadCart();
//       toast.success("Added to cart");
//     } catch {
//       toast.error("Please login to add items");
//     }
//   };

//   const increaseQty = async (id, qty) => {
//     await updateCartQty(id, qty + 1);
//     loadCart();
//   };

//   const decreaseQty = async (id, qty) => {
//     if (qty === 1) return;
//     await updateCartQty(id, qty - 1);
//     loadCart();
//   };

//   const removeFromCart = async (id) => {
//     await removeCartItem(id);
//     loadCart();
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         increaseQty,
//         decreaseQty,
//         removeFromCart,
//         setCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;








