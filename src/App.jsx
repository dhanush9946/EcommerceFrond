
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

import ProductProvider from "./context/ProductProvider";
import CartProvider from "./context/CartProvider";
import WishListProvider from "./context/WishListProvider";

import NavigationBar from "./Pages/common/nav-bar/NavigationBar";
import Footer from "./Pages/common/footer/Footer";

// user
import Home from "./Pages/nonAuth/Home";
import Products from "./Pages/nonAuth/Products";
import CartPage from "./Pages/nonAuth/CartPage";
import ProfilePage from "./Pages/nonAuth/ProfilePage";
import WishlistPage from "./Pages/nonAuth/WishListPage";
import Checkout from "./Pages/nonAuth/Checkout";
import ProductDetails from "./Pages/nonAuth/ProductDetails";
import OrderSuccess from "./Pages/nonAuth/OrderSuccess";
import OrdersPage from "./Pages/nonAuth/OrdersPage";

// Admin
import Sidebar from "./Admin/Sidebar/Sidebar";
import Dashboard from "./Admin/Pages/Dashboard";
import AdminProducts from "./Admin/Pages/AdminProducts";
import Orders from "./Admin/Pages/Orders";
import Users from "./Admin/Pages/Users";

import LoginPage from "./Pages/auth/LoginPage";
import RegistrationPage from "./Pages/auth/RegistrationPage";
import ForgotPassword from "./Pages/auth/ForgetPassword";
import ResetPassword from "./Pages/auth/ResetPassword";
import NotFound from "./Pages/nonAuth/NotFound";
import ProtectedRoute from "./ProtectedRoute";

function AppWrapper() {
  const location = useLocation();

  // Hide navbar & footer on login/register
  const hideLayout =
    ["/login", "/register"].includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <NavigationBar />}
      <div className="flex-grow">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <-- public now */}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Pages (only logged-in users) */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute roles={["User"]}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute roles={["User"]}>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute roles={["User"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute roles={["User"]}>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute roles={["User"]}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <Sidebar />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts/>} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishListProvider>
          <Router>
            <AppWrapper />
          </Router>
        </WishListProvider>
      </CartProvider>
    </ProductProvider>
  );
}




























// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

// import ProductProvider from "./context/ProductProvider";
// import ProtectedRoute from "./ProtectedRoute";

// // Layouts
// import PublicLayout from "./Pages/nonAuth/PublicLayout";
// import UserLayout from "./Pages/nonAuth/UserLayout";

// // Public pages
// import Home from "./Pages/nonAuth/Home";
// import Products from "./Pages/nonAuth/Products";
// import ProductDetails from "./Pages/nonAuth/ProductDetails";

// // Protected user pages
// import CartPage from "./Pages/nonAuth/CartPage";
// import WishlistPage from "./Pages/nonAuth/WishListPage";
// import Checkout from "./Pages/nonAuth/Checkout";
// import OrdersPage from "./Pages/nonAuth/OrdersPage";
// import OrderSuccess from "./Pages/nonAuth/OrderSuccess";
// import ProfilePage from "./Pages/nonAuth/ProfilePage";

// // Auth pages
// import LoginPage from "./Pages/auth/LoginPage";
// import RegistrationPage from "./Pages/auth/RegistrationPage";
// import ForgotPassword from "./Pages/auth/ForgetPassword";
// import ResetPassword from "./Pages/auth/ResetPassword";

// // Admin
// import Sidebar from "./Admin/Sidebar/Sidebar";
// import Dashboard from "./Admin/Pages/Dashboard";
// import Productss from "./Admin/Pages/Products";
// import Orders from "./Admin/Pages/Orders";
// import Users from "./Admin/Pages/Users";

// // Misc
// import NotFound from "./Pages/nonAuth/NotFound";

// function App() {
//   return (
//     <ProductProvider>
//       <Router>
//         <Routes>
//           {/* -------- AUTH -------- */}
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegistrationPage />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />

//           {/* -------- PUBLIC -------- */}
//           <Route element={<PublicLayout />}>
//             <Route index element={<Home />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//           </Route>

//           {/* -------- USER (PROTECTED) -------- */}
//           <Route
//             element={
//               <ProtectedRoute roles={["User"]}>
//                 <UserLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/wishlist" element={<WishlistPage />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/orders" element={<OrdersPage />} />
//             <Route path="/order-success" element={<OrderSuccess />} />
//             <Route path="/profile" element={<ProfilePage />} />
//           </Route>

//           {/* -------- ADMIN -------- */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute roles={["Admin"]}>
//                 <Sidebar />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="products" element={<Productss />} />
//             <Route path="orders" element={<Orders />} />
//             <Route path="users" element={<Users />} />
//           </Route>

//           {/* -------- 404 -------- */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </ProductProvider>
//   );
// }

// export default App;
