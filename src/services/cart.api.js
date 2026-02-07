import api from "./api";

// GET cart
export const fetchCart = () => api.get("/user/cart");

// ADD to cart
export const addCartItem = (productId, quantity = 1) =>
  api.post("/user/cart/add", {
    productId,
    quantity,
  });

// UPDATE quantity
export const updateCartQty = (productId, action) =>
  api.put("/user/cart/update-quantity", {
    productId,
    action,
  });

// REMOVE item
export const removeCartItem = (productId) =>
  api.delete(`/user/cart/remove/${productId}`);
