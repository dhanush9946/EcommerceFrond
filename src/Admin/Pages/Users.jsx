import React, { useEffect, useState } from "react";
import api from "../../services/api"; // adjust path if needed

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users (Admin only)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Block / Unblock user
  const toggleUserStatus = async (userId, isActive) => {
    try {
      await api.patch(`/admin/users/${userId}/status`, {
        isActive: !isActive,
      });

      // Optimistic UI update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, isActive: !isActive }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading users...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-center">Joined On</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>

              {/* Role */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs rounded-lg ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              {/* Created At */}
              <td className="p-3 text-center text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              {/* Block / Unblock */}
              <td className="p-3 text-center">
                <button
                  onClick={() =>
                    toggleUserStatus(user.id, user.isActive)
                  }
                  className={`px-3 py-1 rounded-lg text-white transition ${
                    user.isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {user.isActive ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="p-4 text-center text-gray-500"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
