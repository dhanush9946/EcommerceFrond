// import React, { useContext, useEffect } from "react";
// import { WishlistContext } from "../../context/CreateContext";
// import { Heart, ShoppingCart } from "lucide-react";
// import toast from "react-hot-toast";

// function WishlistPage() {
//   // ✅ HOOKS FIRST (ALWAYS)
//   const wishlistContext = useContext(WishlistContext);

//   // ✅ SAFE FALLBACKS (NO EARLY RETURN)
//   const wishlist = wishlistContext?.wishlist || [];
//   const removeFromWishlist = wishlistContext?.removeFromWishlist;
//   const moveToCart = wishlistContext?.moveToCart;
//   const loadWishlist = wishlistContext?.loadWishlist;

//   // ✅ EFFECT ALWAYS CALLED
//   useEffect(() => {
//     if (!loadWishlist) return;

//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       loadWishlist();
//     }
//   }, [loadWishlist]);

//   // ✅ HANDLER (NO HOOKS)
//   const handleMoveToCart = async (productId) => {
//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//       toast.error("Please login to move items to cart");
//       return;
//     }

//     if (!moveToCart) {
//       toast.error("Action not available");
//       return;
//     }

//     try {
//       await moveToCart(productId);
//       toast.success("Moved to cart 🛒");
//       loadWishlist && loadWishlist();
//     } catch (err) {
//       toast.error("Failed to move item");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
//         My Wishlist
//       </h1>

//       {wishlist.length === 0 ? (
//         <div className="text-center text-gray-500 mt-20">
//           <Heart className="mx-auto w-16 h-16 text-pink-400 mb-4" />
//           <p className="text-lg">Your wishlist is empty</p>
//           <p className="text-sm mt-2">
//             Start adding perfumes you love ❤️
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {wishlist.map((item) => (
//             <div
//               key={item.productId}
//               className="relative bg-white rounded-3xl shadow-md hover:shadow-xl transition border flex flex-col"
//             >
//               {/* Remove */}
//               <button
//                 onClick={() =>
//                   removeFromWishlist && removeFromWishlist(item.productId)
//                 }
//                 className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-20"
//               >
//                 <Heart className="w-5 h-5 fill-pink-600 text-pink-600" />
//               </button>

//               {/* Image */}
//               <div className="p-4">
//                 <div className="h-60 w-full rounded-2xl overflow-hidden bg-pink-50">
//                   <img
//                     src={item.imageUrl || "https://via.placeholder.com/300"}
//                     alt={item.productName}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               </div>

//               {/* Info */}
//               <div className="px-5 pb-5 flex flex-col flex-grow">
//                 <h3 className="text-lg font-semibold mb-1">
//                   {item.productName}
//                 </h3>

//                 <p className="text-sm text-gray-500 mb-4">
//                   {item.description || "Premium luxury fragrance"}
//                 </p>

//                 <div className="mt-auto flex items-center justify-between">
//                   <p className="text-xl font-bold text-pink-600">
//                     ₹{item.price}
//                   </p>

//                   <button
//                     onClick={() => handleMoveToCart(item.productId)}
//                     className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
//                   >
//                     <ShoppingCart size={18} />
//                     Move
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default WishlistPage;








import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../context/CreateContext";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

function WishlistPage() {
  // ✅ HOOKS FIRST
  const wishlistContext = useContext(WishlistContext);

  // ✅ SAFE FALLBACKS
  const wishlist = wishlistContext?.wishlist || [];
  const removeFromWishlist = wishlistContext?.removeFromWishlist;
  const moveToCart = wishlistContext?.moveToCart;
  const loadWishlist = wishlistContext?.loadWishlist;

  // ✅ LOAD ONCE (PAGE OPEN)
  useEffect(() => {
    if (!loadWishlist) return;

    const token = localStorage.getItem("accessToken");
    if (token) {
      loadWishlist();
    }
  }, [loadWishlist]);

  // ✅ MOVE HANDLER (FIXED)
  const handleMoveToCart = async (productId) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login to move items to cart");
      return;
    }

    if (!moveToCart) {
      toast.error("Action not available");
      return;
    }

    try {
      // 🔥 ONLY ONE RESPONSIBILITY
      await moveToCart(productId);

      //toast.success("Moved to cart 🛒");

      // ❌ DO NOT reload wishlist here
      // ❌ DO NOT touch cart here
    } catch (err) {
      toast.error("Failed to move item");
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <Heart className="mx-auto w-16 h-16 text-pink-400 mb-4" />
          <p className="text-lg">Your wishlist is empty</p>
          <p className="text-sm mt-2">
            Start adding perfumes you love ❤️
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.productId}
              className="relative bg-white rounded-3xl shadow-md hover:shadow-xl transition border flex flex-col"
            >
              {/* Remove */}
              <button
                onClick={() =>
                  removeFromWishlist && removeFromWishlist(item.productId)
                }
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-20"
              >
                <Heart className="w-5 h-5 fill-pink-600 text-pink-600" />
              </button>

              {/* Image */}
              <div className="p-4">
                <div className="h-60 w-full rounded-2xl overflow-hidden bg-pink-50">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/300"}
                    alt={item.productName}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="px-5 pb-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1">
                  {item.productName}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  {item.description || "Premium luxury fragrance"}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <p className="text-xl font-bold text-pink-600">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => handleMoveToCart(item.productId)}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
                  >
                    <ShoppingCart size={18} />
                    Move
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;

