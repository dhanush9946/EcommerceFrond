// import React, { useContext, useEffect, useState } from "react";
// import {
//   CartContext,
//   ProductContext,
//   WishlistContext,
// } from "../../context/CreateContext";
// import { Heart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import ProductLoader from "./ProductLoader";

// function Products() {
//   const navigate = useNavigate();

//   // 🔹 CONTEXTS (ALWAYS AT TOP)
//   const productContext = useContext(ProductContext);
//   const cartContext = useContext(CartContext);
//   const wishlistContext = useContext(WishlistContext);

//   // 🔹 HOOKS (ALWAYS CALLED)
//   const [selectedBrand, setSelectedBrand] = useState("All");

//   // 🔹 SAFE FALLBACKS
//   const products = productContext?.products || [];
//   const loading = productContext?.loading || false;
//   const getProducts = productContext?.getProducts;
//   const getProductsByBrand = productContext?.getProductsByBrand;

//   const addToCart = cartContext?.addToCart;

//   const wishlist = wishlistContext?.wishlist || [];
//   const addToWishlist = wishlistContext?.addToWishlist;
//   const removeFromWishlist = wishlistContext?.removeFromWishlist;
//   const loadWishlist = wishlistContext?.loadWishlist;

//   // 🔹 Brand list
//   const brands = ["All", "Dior", "Chanel", "Gucci", "Versace", "Armani"];

//   // 🔹 Load products on brand change
//   useEffect(() => {
//     if (!getProducts || !getProductsByBrand) return;

//     if (selectedBrand === "All") {
//       getProducts();
//     } else {
//       getProductsByBrand(selectedBrand);
//     }
//   }, [selectedBrand, getProducts, getProductsByBrand]);

//   // 🔹 Load wishlist ONLY if provider exists
//   useEffect(() => {
//     if (!loadWishlist) return;

//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       loadWishlist();
//     }
//   }, [loadWishlist]);

//   // 🔹 RENDER GUARD (AFTER HOOKS)
//   if (!productContext) {
//     return <ProductLoader />;
//   }

//   // 🔹 Add to cart
//   const handleAddToCart = (product) => {
//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//       toast.error("Please login to add items to your cart!");
//       return;
//     }

//     if (!product.inStock) {
//       toast.error("This product is currently unavailable!");
//       return;
//     }

//     if (!addToCart) {
//       toast.error("Cart not available");
//       return;
//     }

//     addToCart(product);
//   };

//   // 🔹 Wishlist toggle
//   const toggleWishlist = (productId) => {
//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//       toast.error("Please login to use wishlist!");
//       return;
//     }

//     if (!addToWishlist || !removeFromWishlist) return;

//     const isInWishlist = wishlist.some(
//       (item) => item.productId === productId
//     );

//     if (isInWishlist) {
//       removeFromWishlist(productId);
//     } else {
//       addToWishlist(productId);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-center mt-12 mb-6">
//         Perfume Collection
//       </h1>

//       <h3 className="text-2xl font-bold text-center mb-6">
//         Top Brands
//       </h3>

//       {/* Brand Buttons */}
//       <div className="flex flex-wrap justify-center gap-4 mb-10">
//         {brands.map((brand) => (
//           <button
//             key={brand}
//             onClick={() => setSelectedBrand(brand)}
//             className={`px-5 py-2 rounded-full border transition ${
//               selectedBrand === brand
//                 ? "bg-black text-white"
//                 : "bg-white text-black border-black hover:bg-gray-800 hover:text-white"
//             }`}
//           >
//             {brand}
//           </button>
//         ))}
//       </div>

//       {/* Products */}
//       {loading ? (
//         <ProductLoader />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {products.length === 0 ? (
//             <p className="col-span-full text-center text-gray-600">
//               No perfumes found.
//             </p>
//           ) : (
//             products.map((product) => {
//               const isInWishlist = wishlist.some(
//                 (item) => item.productId === product.id
//               );

//               return (
//                 <div
//                   key={product.id}
//                   className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col border"
//                 >
//                   {/* Wishlist */}
//                   <button
//                     onClick={() => toggleWishlist(product.id)}
//                     className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10"
//                   >
//                     <Heart
//                       className={`w-5 h-5 ${
//                         isInWishlist
//                           ? "fill-pink-600 text-pink-600"
//                           : "text-gray-400"
//                       }`}
//                     />
//                   </button>

//                   {/* Image */}
//                   <div
//                     onClick={() => navigate(`/product/${product.id}`)}
//                     className="h-64 w-full overflow-hidden cursor-pointer"
//                   >
//                     <img
//                       src={product.image || "https://via.placeholder.com/300"}
//                       alt={product.name}
//                       className="h-full w-full object-cover hover:scale-105 transition-transform"
//                     />
//                   </div>

//                   {/* Info */}
//                   <div
//                     onClick={() => navigate(`/product/${product.id}`)}
//                     className="p-5 flex-1 cursor-pointer"
//                   >
//                     <h3 className="text-lg font-semibold mb-1">
//                       {product.name}
//                     </h3>
//                     <p className="text-sm italic mb-1">
//                       {product.brand}
//                     </p>
//                     <p className="text-sm line-clamp-2">
//                       {product.description}
//                     </p>
//                   </div>

//                   {/* Price + Cart */}
//                   <div className="flex items-center justify-between px-5 pb-5">
//                     <p className="text-xl font-bold">
//                       ₹{product.price}
//                     </p>
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       disabled={!product.inStock}
//                       className={`px-4 py-2 rounded-full ${
//                         product.inStock
//                           ? "bg-black text-white hover:bg-gray-800"
//                           : "bg-gray-400 text-gray-600 cursor-not-allowed"
//                       }`}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;


import React, { useContext, useEffect, useState } from "react";
import { CartContext, ProductContext, WishlistContext } from "../../context/CreateContext";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProductLoader from "./ProductLoader";

function Products() {
  const navigate = useNavigate();
  const { products, loading, getProducts, getProductsByBrand } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist, loadWishlist } = useContext(WishlistContext);
  const [selectedBrand, setSelectedBrand] = useState("All");

  // 🔹 Brand list
  const brands = ["All", "Dior", "Chanel", "Gucci", "Versace", "Armani"];

  // 🔹 Load products on brand change
  useEffect(() => {
    if (selectedBrand === "All") {
      getProducts();
    } else {
      getProductsByBrand(selectedBrand);
    }
  }, [selectedBrand, getProducts, getProductsByBrand]);

  // 🔹 Load wishlist ONCE
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      loadWishlist();
    }
  }, [loadWishlist]);

  // 🔹 Add to cart
  const handleAddToCart = (product) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to add items to your cart!");
      return;
    }
    if (!product.inStock) {
      toast.error("This product is currently unavailable!");
      return;
    }
    addToCart(product);
  };

  // 🔹 Wishlist toggle (CORRECT)
  const toggleWishlist = (productId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to use wishlist!");
      return;
    }
    const isInWishlist = wishlist.some((item) => item.productId === productId);
    if (isInWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mt-12 text-gray-800 mb-6">
        Perfume Collection
      </h1>
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Top Brands</h3>
      
      {/* 🔹 Brand Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-5 py-2 rounded-full border transition ${
              selectedBrand === brand
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-gray-800 hover:text-white"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* 🔹 Loader */}
      {loading ? (
        <ProductLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">No perfumes found.</p>
          ) : (
            products.map((product) => {
              const isInWishlist = wishlist.some((item) => item.productId === product.id);
              return (
                <div
                  key={product.id}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col border"
                >
                  {/* ❤️ Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist ? "fill-pink-600 text-pink-600" : "text-gray-400"
                      }`}
                    />
                  </button>

                  {/* Stock */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-lg z-10 ${
                      product.inStock ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.inStock ? "Available" : "Out of Stock"}
                  </span>

                  {/* Image */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="h-64 w-full overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image || "https://via.placeholder.com/300"}
                      alt={product.name}
                      className="h-full w-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="p-5 flex-1 cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 italic mb-1">{product.brand}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
                  </div>

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between px-5 pb-5">
                    <p className="text-xl font-bold text-black">₹{product.price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-full transition ${
                        product.inStock
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
