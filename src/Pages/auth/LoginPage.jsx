
import React, { useState } from "react";
import api from "../../services/api";
import { CartContext, WishlistContext } from "../../Context/CreateContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* 🔹 NEW: Import contexts to trigger updates */
  const { loadCart } = React.useContext(CartContext);
  const { loadWishlist } = React.useContext(WishlistContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: res.data.userId,
          name: res.data.name,
          role: res.data.role,
        })
      );

      // 🔹 Trigger updates immediately
      await loadCart();
      await loadWishlist();

      toast.success("Login successful");
      navigate(res.data.role === "Admin" ? "/admin/dashboard" : "/");
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors) setFieldErrors(errors);
      else toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <form
        onSubmit={handleLogin}
        autoComplete="on"
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Login to Zyra
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
          {fieldErrors.Email && (
            <p className="text-red-500 text-sm mt-1">
              {fieldErrors.Email[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
          />
          {fieldErrors.Password && (
            <p className="text-red-500 text-sm mt-1">
              {fieldErrors.Password[0]}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Links OUTSIDE form actions */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold">
            Register
          </Link>
        </p>
        <p className="text-center mt-2">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;



























// import React, { useState } from "react";
// import api from "../../services/api";
// import { useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";

// function LoginPage() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fieldErrors, setFieldErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setFieldErrors({});

//     if (!email || !password) {
//       toast.error("Email and password are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.post(
//         "/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       localStorage.setItem("accessToken", res.data.accessToken);
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           userId: res.data.userId,
//           name: res.data.name,
//           role: res.data.role,
//         })
//       );

//       toast.success("Login successful");

//       navigate(res.data.role === "Admin" ? "/admin/dashboard" : "/");
//     } catch (error) {
//       const errors = error.response?.data?.errors;
//       if (errors) setFieldErrors(errors);
//       else toast.error("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
//       <form
//         onSubmit={handleLogin}
//         autoComplete="on"
//         className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           Login to Zyra
//         </h2>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             autoComplete="username"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Enter your email"
//           />
//           {fieldErrors.Email && (
//             <p className="text-red-500 text-sm mt-1">
//               {fieldErrors.Email[0]}
//             </p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-medium mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Enter your password"
//           />
//           {fieldErrors.Password && (
//             <p className="text-red-500 text-sm mt-1">
//               {fieldErrors.Password[0]}
//             </p>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition disabled:opacity-60"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {/* Links OUTSIDE form actions */}
//         <p className="text-center text-gray-600 mt-4">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-indigo-600 font-semibold"
//           >
//             Register
//           </Link>
//         </p>

//         <p className="text-center mt-2">
//           <Link
//             to="/forgot-password"
//             className="text-sm text-indigo-500 hover:underline"
//           >
//             Forgot Password?
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;
