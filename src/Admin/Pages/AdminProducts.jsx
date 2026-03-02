import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminApi from "../../services/adminApi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [newProduct, setNewProduct] = useState({
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

  // 🔹 Fetch products (ADMIN)
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (pageNum = 1) => {
    try {
      setLoading(true);
      // Ensure your API supports ?page= query param
      const res = await adminApi.get(`/products?page=${pageNum}&pageSize=10`);
      
      setProducts(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
      setPage(res.data.page || pageNum);

    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Local search (Note: Ideally search should be backend-side for paginated data)
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
        imageUrl: "",
        status: "active",
      });

      fetchProducts(page);
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
      fetchProducts(page);
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
      fetchProducts(page);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

 const toggleStatus = async (product) => {
  try {
    await adminApi.patch(`/products/${product.id}/status`);
    toast.success("Status updated");
    fetchProducts(page);
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

      {/* Add Product Form */}
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
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
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
        <>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Brand</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 text-center">
                <td className="p-2 border">
                  <img 
                    src={p.imageUrl || "https://via.placeholder.com/50"} 
                    alt={p.name} 
                    className="w-12 h-12 object-cover rounded mx-auto border"
                  />
                </td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.brand}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">₹{p.price}</td>
                <td className="p-2 border">{p.stock}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => toggleStatus(p)}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
        </>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="font-bold mb-3 text-lg">Edit Product</h3>

            {["name", "brand", "category", "price", "imageUrl"].map((field) => (
              <div key={field} className="mb-2">
                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{field}</label>
                 <input
                  className="border px-3 py-2 rounded w-full"
                  value={editingProduct[field]}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      [field]: e.target.value,
                    })
                  }
                />
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
