import React, { useEffect, useState, useContext } from "react";
import NavigationBar from "../common/nav-bar/NavigationBar";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { CartContext } from "../../context/CreateContext";
import api from "../../services/api";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  // If not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen pt-32 bg-gray-50">
        <h2 className="text-xl text-red-600 font-semibold mb-8">
          Please login or sign up to view your profile.
        </h2>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
      <NavigationBar />

      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-xl p-8 mb-10 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {user.name}
        </h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-500 mt-2">
          Cart Items: {cart.length}
        </p>
      </div>

      {/* Orders Navigation */}
      <div className="bg-white shadow-lg rounded-xl p-6 border text-center mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          My Orders
        </h2>

        <p className="text-gray-600 mb-6">
          View and manage all your orders in one place.
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
        >
          View My Orders
        </button>
      </div>

      {/* Logout */}
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
