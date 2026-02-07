import React, { useState, useCallback } from "react";
import api from "../services/api";
import { ProductContext } from "./CreateContext";

const ProductProvider = ({ children }) => {
  // 🔹 Products page data
  const [products, setProducts] = useState([]);

  // 🔹 Navbar search dropdown data
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);

  // =========================
  // PRODUCTS PAGE APIs
  // =========================

  // Get all products
  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get products by brand (Products page)
  const getProductsByBrand = useCallback(async (brand) => {
    setLoading(true);
    try {
      const res = await api.get(`/products/search?brand=${encodeURIComponent(brand)}`);
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductsByGender = useCallback(async (gender) => {
  setLoading(true);
  try {
    const res = await api.get(
      `/products/search?gender=${encodeURIComponent(gender)}`
    );
    setProducts(res.data);
  } finally {
    setLoading(false);
  }
}, []);


  // =========================
  // NAVBAR SEARCH ONLY
  // =========================
  const searchProducts = useCallback(async (search) => {
    if (!search || !search.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await api.get(
        `/products/search?search=${encodeURIComponent(search)}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  }, []);

  // =========================
  // PRODUCT DETAILS
  // =========================
  const getProductById = useCallback(async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  }, []);

  return (
    <ProductContext.Provider
  value={{
    products,
    loading,
    getProducts,
    getProductsByBrand,
    getProductsByGender,   // ✅
    searchResults,
    searchProducts,
    getProductById,
  }}
>

      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
