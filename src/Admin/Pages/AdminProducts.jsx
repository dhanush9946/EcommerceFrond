import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminApi from "../../services/adminApi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    maxOrderQuantity: "",
    gender: "",
    description: "",
    imageUrl: "",
    status: "active",
  });

  // 🔹 Fetch products (ADMIN)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/products");
      setProducts(res.data.items || []); // ✅ FIX
    } catch (err) {
      
  console.log("ERROR OBJECT:", err);
  console.log("ERROR RESPONSE:", err.response);
  console.log("ERROR MESSAGE:", err.message);
  toast.error("Failed to fetch products");


      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Local search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ Add Product
  const handleAddProduct = async () => {
    try {
      await adminApi.post("/products", {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        maxOrderQuantity: Number(newProduct.maxOrderQuantity),
      });
      
      toast.success("Product added");
      setNewProduct({
  name: "",
  brand: "",
  category: "",
  price: "",
  stock: "",
  maxOrderQuantity: "",
  gender: "",
  description: "",
  image: "",
  status: "active",
});

      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Add product failed");
    }
  };

  // ✏️ Update Product
  const handleEditProduct = async () => {
    try {
      await adminApi.put(`/products/${editingProduct.id}`, {
        name: editingProduct.name,
        brand: editingProduct.brand,
        category: editingProduct.category,
        price: Number(editingProduct.price),
        imageUrl: editingProduct.imageUrl,
        gender: editingProduct.gender,
        description: editingProduct.description,
        status: editingProduct.isActive ? "active" : "inactive",
      });

      toast.success("Product updated");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // ❌ Soft delete
  const handleDelete = async (id) => {
    try {
      await adminApi.patch(`/products/update/${id}`);
      toast.success("Product deactivated");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

 const toggleStatus = async (product) => {
  try {
    await adminApi.patch(`/products/${product.id}/status`);
    toast.success("Status updated");
    fetchProducts();
  } catch {
    toast.error("Failed to update status");
  }
};



  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Admin – Manage Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border px-4 py-2 rounded-lg w-1/2 mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Product */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-3">Add Product</h3>

        <div className="grid grid-cols-2 gap-3">
          {["name", "brand", "category", "gender"].map((field) => (
            <input
              key={field}
              placeholder={field}
              className="border px-3 py-2 rounded"
              value={newProduct[field]}
              onChange={(e) =>
                setNewProduct({ ...newProduct, [field]: e.target.value })
              }
            />
          ))}

          <input
            type="number"
            placeholder="Price"
            className="border px-3 py-2 rounded"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Stock"
            className="border px-3 py-2 rounded"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Max Order Qty"
            className="border px-3 py-2 rounded"
            value={newProduct.maxOrderQuantity}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                maxOrderQuantity: e.target.value,
              })
            }
          />

          <input
            placeholder="Image URL"
            className="border px-3 py-2 rounded col-span-2"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
        </div>

        <textarea
          placeholder="Description"
          className="border px-3 py-2 rounded w-full mt-3"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />

        <button
          onClick={handleAddProduct}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-t">
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>
                  <button
                    onClick={() => toggleStatus(p)}
                    className={`px-2 py-1 rounded ${
                      p.isActive ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {p.isActive ? "active" : "inactive"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-1/3">
            <h3 className="font-bold mb-3">Edit Product</h3>

            {["name", "brand", "category", "price", "imageUrl"].map((field) => (
              <input
                key={field}
                className="border px-3 py-2 rounded w-full mb-2"
                value={editingProduct[field]}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    [field]: e.target.value,
                  })
                }
              />
            ))}

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
