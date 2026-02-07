// import React, { useContext, useState, useEffect } from "react";
// import { CartContext, ProductContext } from "../../context/CreateContext";
// import ShopByGender from "./ShopByGender";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import ProductLoader from "./ProductLoader";

// function ProductList() {
//   const navigate = useNavigate();

//   // 🔹 CONTEXTS (ALWAYS AT TOP)
//   const productContext = useContext(ProductContext);
//   const cartContext = useContext(CartContext);

//   // 🔹 HOOKS MUST ALWAYS RUN
//   const [gender, setGender] = useState("All");

//   // 🔹 SAFE FALLBACKS
//   const products = productContext?.products || [];
//   const loading = productContext?.loading || false;
//   const getProducts = productContext?.getProducts;
//   const getProductsByBrand = productContext?.getProductsByBrand;

//   const addToCart = cartContext?.addToCart;

//   // 🔹 EFFECT (SAFE)
//   useEffect(() => {
//     if (!getProducts || !getProductsByBrand) return;

//     if (gender === "All") {
//       getProducts();
//     } else {
//       getProductsByBrand(gender);
//     }
//   }, [gender, getProducts, getProductsByBrand]);

//   // 🔹 RENDER GUARD (AFTER HOOKS)
//   if (!productContext) {
//     return <ProductLoader />;
//   }

//   const handleAddToCart = (product) => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
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

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-10 text-center">
//         Premium Perfume Collection
//       </h2>

//       <ShopByGender onSelect={setGender} />

//       {loading ? (
//         <ProductLoader />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//           {products.length > 0 ? (
//             products.slice(0, 8).map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-pink-50 rounded-3xl shadow-md hover:shadow-2xl transition"
//               >
//                 <div
//                   onClick={() => navigate(`/product/${product.id}`)}
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={product.image || "https://via.placeholder.com/300"}
//                     alt={product.name}
//                     className="h-60 w-full object-cover"
//                   />
//                 </div>

//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold">
//                     {product.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-3">
//                     {product.description}
//                   </p>

//                   <div className="flex justify-between items-center">
//                     <span className="font-bold">₹{product.price}</span>
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       disabled={!product.inStock}
//                       className={`px-4 py-2 rounded-full text-white ${
//                         product.inStock
//                           ? "bg-black hover:bg-pink-600"
//                           : "bg-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       {product.inStock ? "Add to Cart" : "Unavailable"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="col-span-full text-center">
//               No perfumes found.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductList;





















// import React, { useContext, useEffect, useState } from "react";
// import { CartContext, ProductContext } from "../../context/CreateContext";
// import ShopByGender from "./ShopByGender";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import ProductLoader from "./ProductLoader";

// function ProductList() {
//   const navigate = useNavigate();

//   // ✅ ALL HOOKS AT TOP (NO CONDITIONS)
//   const productContext = useContext(ProductContext);
//   const cartContext = useContext(CartContext);
//   const [gender, setGender] = useState("All");

//   // ✅ SAFE DEFAULTS (NO DESTRUCTURING FROM UNDEFINED)
//   const products = productContext?.products ?? [];
//   const loading = productContext?.loading ?? true;
//   const getProducts = productContext?.getProducts;
//   const getProductsByGender = productContext?.getProductsByGender;

//   const addToCart = cartContext?.addToCart;

//   // ✅ EFFECT ALWAYS CALLED
//   useEffect(() => {
//     if (!getProducts || !getProductsByGender) return;

//     if (gender === "All") {
//       getProducts();
//     } else {
//       getProductsByGender(gender);
//     }
//   }, [gender, getProducts, getProductsByGender]);

//   // ✅ HANDLERS (NO HOOKS HERE)
//   const handleAddToCart = (product) => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
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

//   // ✅ CONDITIONAL RENDERING (AFTER ALL HOOKS)
//   if (loading) {
//     return <ProductLoader />;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-3xl font-extrabold mb-10 text-center">
//         Premium Perfume Collection
//       </h2>

//       {/* Gender Filter */}
//       <ShopByGender onSelect={setGender} />

//       {/* Products */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-pink-50 rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden"
//             >
//               {/* Image */}
//               <div
//                 onClick={() => navigate(`/product/${product.id}`)}
//                 className="cursor-pointer"
//               >
//                 <img
//                   src={product.image || "https://via.placeholder.com/300"}
//                   alt={product.name}
//                   className="h-60 w-full object-cover"
//                 />
//               </div>

//               {/* Info */}
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold mb-1">
//                   {product.name}
//                 </h3>

//                 <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                   {product.description}
//                 </p>

//                 <div className="flex justify-between items-center">
//                   <span className="font-bold text-lg">
//                     ₹{product.price}
//                   </span>

//                   <button
//                     onClick={() => handleAddToCart(product)}
//                     disabled={!product.inStock}
//                     className={`px-4 py-2 rounded-full text-white transition ${
//                       product.inStock
//                         ? "bg-black hover:bg-pink-600"
//                         : "bg-gray-400 cursor-not-allowed"
//                     }`}
//                   >
//                     {product.inStock ? "Add to Cart" : "Unavailable"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-600">
//             No perfumes found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductList;

import React, { useContext, useState, useEffect } from "react";
import { CartContext, ProductContext } from "../../context/CreateContext";
import ShopByGender from "./ShopByGender";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import ProductLoader from "./ProductLoader";

function ProductList() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { products, loading, getProducts, getProductsByGender } = useContext(ProductContext);
  const [gender, setGender] = useState("All");

  useEffect(() => {
    if (gender === "All") {
      getProducts();
    } else {
      getProductsByGender(gender);
    }
  }, [gender, getProducts, getProductsByGender]);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to add items to your cart!");
      return;
    }
    if (!product.inStock) {
      toast.error("This product is currently unavailable!");
      return;
    }
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-10 text-center text-black tracking-wide">
        Premium Perfume Collection
      </h2>
      
      <ShopByGender onSelect={setGender} />
      
      {loading ? (
        <ProductLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.length > 0 ? (
            products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="bg-pink-50 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col border border-pink-100 hover:border-pink-300"
              >
                {/* Image */}
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="h-64 w-full overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image || "https://via.placeholder.com/300x400"}
                    alt={product.name}
                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>
                
                {/* Info */}
                <div className="p-6 flex flex-col flex-1 bg-pink-50">
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="cursor-pointer flex-1 flex flex-col"
                  >
                    <h3 className="text-xl font-semibold text-black mb-2 tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-sm text-black mb-4 italic">
                      {product.description || "A luxury fragrance for every mood."}
                    </p>
                  </div>
                  
                  {/* Price + Button */}
                  <div className="mt-auto flex items-center justify-between py-2">
                    <p className="text-2xl font-bold text-black">₹{product.price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${
                        product.inStock
                          ? "bg-black text-white hover:bg-pink-600"
                          : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      {product.inStock ? "Add to Cart" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-black text-lg">
              No perfumes found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
