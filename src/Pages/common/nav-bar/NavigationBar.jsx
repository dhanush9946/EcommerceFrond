import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext, CartContext, WishlistContext } from "../../../context/CreateContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { searchResults, searchProducts } = useContext(ProductContext);
  const { cart = [] } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // Toggle for search input

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        searchProducts(searchTerm);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 400); // debounce
    return () => clearTimeout(timer);
  }, [searchTerm, searchProducts]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 shadow-md border-b border-pink-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        
        {/* 1. LEFT: Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          <button 
            className="text-black uppercase tracking-widest text-sm font-medium hover:text-pink-600 transition-colors duration-300" 
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button 
            className="text-black uppercase tracking-widest text-sm font-medium hover:text-pink-600 transition-colors duration-300" 
            onClick={() => navigate("/products")}
          >
            Shop
          </button>
        </div>

        {/* 2. CENTER: Mobile Menu Button (Visible only on Mobile) */}
        <div className="md:hidden flex-1">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-2xl text-black" /> : <FaBars className="text-2xl text-black" />}
          </button>
        </div>

        {/* 3. CENTER: Brand Logo */}
        <div className="flex-shrink-0 cursor-pointer text-center" onClick={() => navigate("/")}>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-black tracking-widest">
            ZYRA
          </h1>
        </div>

        {/* 4. RIGHT: Search & Icons */}
        <div className="flex-1 flex items-center justify-end gap-6">
          
          {/* Animated Search Bar */}
          <div className="relative hidden md:flex items-center">
             <div className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center ${searchOpen ? "w-60 opacity-100" : "w-0 opacity-0"}`}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  className="bg-transparent border-b border-black text-black placeholder-gray-600 outline-none w-full px-2 py-1 text-sm"
                  autoFocus={searchOpen}
                />
             </div>
             <button onClick={() => setSearchOpen(!searchOpen)} className="text-black hover:text-pink-600 transition-colors">
               <FaSearch className="text-lg" />
             </button>

             {/* Search Results Dropdown */}
             {showResults && searchTerm && searchOpen && (
              <div className="absolute top-10 right-0 w-64 bg-white border border-pink-200 shadow-xl max-h-60 overflow-y-auto z-50 rounded-sm">
                {searchResults.length > 0 ? (
                  searchResults.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 cursor-pointer border-b border-gray-100"
                      onMouseDown={() => navigate(`/product/${p.id}`)}
                    >
                      <img
                        src={p.image || "https://via.placeholder.com/40"}
                        alt={p.name}
                        className="w-8 h-8 object-cover"
                      />
                      <span className="text-sm text-black font-medium">{p.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-gray-500">No results found.</p>
                )}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <div className="relative cursor-pointer group" onClick={() => navigate("/wishlist")}>
            <FaHeart className="text-black group-hover:text-pink-600 transition-colors text-lg" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer group" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-black group-hover:text-pink-600 transition-colors text-lg" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* Profile */}
          <FaUser 
            onClick={() => navigate("/profile")} 
            className="cursor-pointer text-black hover:text-pink-600 transition-colors text-lg hidden md:block" 
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-pink-50 border-t border-pink-200 px-6 py-6 flex flex-col gap-4 text-center">
          <button className="text-black uppercase tracking-widest text-sm font-medium" onClick={() => { setMenuOpen(false); navigate("/"); }}>Home</button>
          <button className="text-black uppercase tracking-widest text-sm font-medium" onClick={() => { setMenuOpen(false); navigate("/products"); }}>Shop</button>
          <button className="text-black uppercase tracking-widest text-sm font-medium" onClick={() => { setMenuOpen(false); navigate("/profile"); }}>Account</button>
          
          {/* Mobile Search Input */}
          <div className="relative mt-2">
            <input
               type="text"
               placeholder="Search..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-white border border-pink-200 px-4 py-2 rounded text-sm outline-none focus:border-pink-400"
            />
             {showResults && searchTerm && (
              <div className="absolute top-10 left-0 w-full bg-white border border-pink-200 shadow-lg max-h-40 overflow-y-auto z-50 text-left">
                {searchResults.map((p) => (
                  <div key={p.id} className="px-4 py-2 hover:bg-pink-50 text-sm" onMouseDown={() => { setMenuOpen(false); navigate(`/product/${p.id}`); }}>
                    {p.name}
                  </div>
                ))}
              </div>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
}

















// import React, { useContext, useEffect, useState } from "react";
// import {
//   FaSearch,
//   FaUser,
//   FaHeart,
//   FaShoppingCart,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import {
//   ProductContext,
//   CartContext,
//   WishlistContext,
// } from "../../../context/CreateContext";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   // ---------------- SAFE CONTEXT USAGE ----------------
//   const productContext = useContext(ProductContext);
//   const cartContext = useContext(CartContext);
//   const wishlistContext = useContext(WishlistContext);

//   const searchResults = productContext?.searchResults || [];
//   const searchProducts = productContext?.searchProducts;

//   const cart = cartContext?.cart || [];
//   const wishlist = wishlistContext?.wishlist || [];

//   // ---------------- SEARCH STATE ----------------
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showResults, setShowResults] = useState(false);

//   useEffect(() => {
//     if (!searchProducts) return;

//     const timer = setTimeout(() => {
//       if (searchTerm.trim() !== "") {
//         searchProducts(searchTerm);
//         setShowResults(true);
//       } else {
//         setShowResults(false);
//       }
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [searchTerm, searchProducts]);

//   const isLoggedIn = !!localStorage.getItem("user");

//   // ---------------- UI ----------------
//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 shadow-lg border-b border-pink-300">
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Brand */}
//         <div
//           className="flex items-center gap-3 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           <img
//             src="/zyra-logo.jpg"
//             alt="logo"
//             className="w-20 h-12 rounded-3xl border-2 border-pink-400 shadow-md"
//           />
//           <span className="text-3xl font-bold tracking-wider text-black font-serif">
//             ZYRA
//           </span>
//         </div>

//         {/* Search */}
//         <div className="hidden md:flex items-center relative w-80">
//           <div className="flex items-center bg-pink-50 px-3 py-2 rounded-full w-full border border-pink-300 shadow-inner">
//             <FaSearch className="text-black mr-2" />
//             <input
//               type="search"
//               placeholder="Search on Zyra"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onBlur={() => setTimeout(() => setShowResults(false), 200)}
//               className="bg-transparent outline-none w-full text-sm text-black placeholder-gray-500"
//             />
//           </div>

//           {showResults && searchTerm && (
//             <div className="absolute top-12 left-0 w-full bg-pink-50 border border-pink-300 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
//               {searchResults.length > 0 ? (
//                 searchResults.map((p) => (
//                   <div
//                     key={p.id}
//                     className="flex items-center gap-3 px-4 py-2 hover:bg-pink-100 cursor-pointer text-black"
//                     onMouseDown={() => navigate(`/product/${p.id}`)}
//                   >
//                     <img
//                       src={p.image || "https://via.placeholder.com/40"}
//                       alt={p.name}
//                       className="w-10 h-10 object-cover rounded border border-pink-300"
//                     />
//                     <span>{p.name}</span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="px-4 py-2 text-gray-700">
//                   No products found
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <button onClick={() => navigate("/")}>Home</button>
//           <button onClick={() => navigate("/products")}>Products</button>

//           {/* Wishlist */}
//           <div
//             className="relative cursor-pointer"
//             onClick={() => navigate("/wishlist")}
//           >
//             <FaHeart className="text-black hover:text-red-500 text-xl" />
//             {wishlist.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                 {wishlist.length}
//               </span>
//             )}
//           </div>

//           {/* Cart */}
//           <div
//             className="relative cursor-pointer"
//             onClick={() => navigate("/cart")}
//           >
//             <FaShoppingCart className="text-black hover:text-gray-700 text-xl" />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </div>

//           <FaUser
//             onClick={() => navigate(isLoggedIn ? "/profile" : "/login")}
//             className="cursor-pointer text-black hover:text-gray-700 text-xl"
//           />
//         </div>

//         {/* Mobile Toggle */}
//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? (
//               <FaTimes className="text-2xl text-black" />
//             ) : (
//               <FaBars className="text-2xl text-black" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-pink-50 shadow-lg border-t border-pink-200 px-6 py-4 flex flex-col gap-4">
//           <button onClick={() => navigate("/")}>Home</button>
//           <button onClick={() => navigate("/products")}>Products</button>

//           {!isLoggedIn && (
//             <button onClick={() => navigate("/login")}>Login</button>
//           )}

//           <div className="flex gap-6 mt-2">
//             <FaHeart onClick={() => navigate("/wishlist")} />
//             <FaShoppingCart onClick={() => navigate("/cart")} />
//             <FaUser
//               onClick={() =>
//                 navigate(isLoggedIn ? "/profile" : "/login")
//               }
//             />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
