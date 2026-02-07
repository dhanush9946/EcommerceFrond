import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext, ProductContext } from "../../context/CreateContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);
  const { getProductById } = useContext(ProductContext);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductById]);

  // 🔹 Add to cart with login + stock check
  const handleAddToCart = () => {
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
    toast.success("Added to cart");
  };

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  // 🔹 Not found
  if (!product) {
    return (
      <p className="text-center text-red-500 mt-20">
        Product not found.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="relative group">
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg transform group-hover:scale-105 transition duration-500"
          />

          {product.inStock && (
            <div className="absolute top-4 left-4 bg-pink-600 text-white px-4 py-1 rounded-full text-sm shadow">
              In Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            {product.name}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {product.description ||
              "A luxurious fragrance crafted with elegance."}
          </p>

          <p className="text-3xl font-bold text-pink-600">
            ₹{product.price}
          </p>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-8 py-3 rounded-xl shadow-lg transition-transform ${
              product.inStock
                ? "bg-gradient-to-r from-pink-600 to-pink-700 text-white hover:scale-105"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          {/* Highlights */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Highlights</h2>
            <ul className="grid grid-cols-2 gap-3 text-gray-700">
              <li>✔ Long-lasting</li>
              <li>✔ Premium Quality</li>
              <li>✔ Elegant Fragrance</li>
              <li>✔ Perfect Gift</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
