


// src/context/WishListProvider.jsx
import React, { useEffect, useState, useCallback, useContext } from "react";
import { WishlistContext } from "./CreateContext";
import api from "../services/api";
import toast from "react-hot-toast";
import { CartContext } from "./CreateContext";

function WishListProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const {addItemToCartState}=useContext(CartContext);

  // ✅ GET wishlist (memoized)
  const loadWishlist = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "Admin") {
      setWishlist([]);
      return;
    }

    try {
      const res = await api.get("/user/wishlist");
      setWishlist(res.data || []);
    } catch (error) {
      console.error("Failed to load wishlist", error);
    }
  }, []);

  // ✅ Load wishlist ONLY if logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      loadWishlist();
    }
  }, [loadWishlist]);

  // ✅ ADD to wishlist
  const addToWishlist = async (productId) => {
    try {
      await api.post("/user/wishlist", { productId });
      toast.success("Added to wishlist ❤️");
      loadWishlist();
    } catch (error) {
      toast.error("Failed to add to wishlist");
      console.error(error);
    }
  };

  // ✅ REMOVE from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/user/wishlist/${productId}`);
      toast.success("Removed from wishlist");
      setWishlist((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      toast.error("Failed to remove item");
      console.error(error);
    }
  };

  // ✅ MOVE to cart
  const moveToCart = async (productId) => {
    try {
      const res = await api.post(`/user/wishlist/move-to-cart/${productId}`);
      addItemToCartState(res.data);

      toast.success("Moved to cart 🛒");
      loadWishlist();
      
    } catch (error) {
      toast.error("Failed to move to cart");
      console.error(error);
    }
  };




  

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        loadWishlist,
        setWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishListProvider;




















// import React, { useEffect, useState, useCallback } from "react";
// import { WishlistContext } from "./CreateContext";
// import api from "../services/api";
// import toast from "react-hot-toast";

// function WishListProvider({ children }) {
//   const [wishlist, setWishlist] = useState([]);

//   // 🔹 Load wishlist (only if logged in)
//   const loadWishlist = useCallback(async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       setWishlist([]);
//       return;
//     }

//     try {
//       const res = await api.get("/user/wishlist");
//       setWishlist(res.data || []);
//     } catch (err) {
//       if (err.response?.status === 403) {
//         toast.error("Your account has been blocked");
//         localStorage.clear();
//         window.location.href = "/login";
//       } else {
//         console.error("Load wishlist failed", err);
//       }
//     }
//   }, []);

//   // 🔹 Load wishlist on mount
//   useEffect(() => {
//     loadWishlist();
//   }, [loadWishlist]);

//   // 🔹 Add to wishlist
//   const addToWishlist = async (productId) => {
//     try {
//       await api.post("/user/wishlist", { productId });
//       toast.success("Added to wishlist ❤️");
//       loadWishlist();
//     } catch (err) {
//       toast.error("Failed to add to wishlist");
//       console.error(err);
//     }
//   };

//   const moveToCart = async (productId) => {
//   try {
//     await api.post(`/user/wishlist/move-to-cart/${productId}`);

//     // ✅ remove from wishlist UI
//     setWishlist((prev) =>
//       prev.filter((item) => item.productId !== productId)
//     );

//     toast.success("Moved to cart 🛒");
//   } catch (err) {
//     if (err.response?.status === 403) {
//       toast.error("Your account has been blocked");
//       localStorage.clear();
//       window.location.href = "/login";
//     } else {
//       toast.error("Failed to move item to cart");
//       console.error(err);
//     }
//   }
// };

//   // 🔹 Remove from wishlist
//   const removeFromWishlist = async (productId) => {
//     try {
//       await api.delete(`/user/wishlist/${productId}`);
//       setWishlist((prev) =>
//         prev.filter((item) => item.productId !== productId)
//       );
//       toast.success("Removed from wishlist");
//     } catch (err) {
//       toast.error("Failed to remove item");
//       console.error(err);
//     }
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         loadWishlist,
//         moveToCart,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }

// export default WishListProvider;
