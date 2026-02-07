import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // 🔥 IMPORTANT: Clear autofilled values on mount
  useEffect(() => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    setFieldErrors({});
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        phoneNumber,
        password,
        confirmPassword,
      });

      toast.success("Registration successful");
      navigate("/login");

    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors) {
        setFieldErrors(errors);
      } else {
        toast.error("Registration failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <form
        onSubmit={handleRegister}
        autoComplete="off"
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Create an Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Enter your name"
          />
          {fieldErrors.Name && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.Name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            autoComplete="new-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Enter your email"
          />
          {fieldErrors.Email && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.Email[0]}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            autoComplete="off"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Enter phone number"
          />
          {fieldErrors.PhoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {fieldErrors.PhoneNumber[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Enter password"
          />
          {fieldErrors.Password && (
            <ul className="text-red-500 text-sm mt-1 list-disc pl-5">
              {fieldErrors.Password.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Confirm password"
          />
          {fieldErrors.ConfirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {fieldErrors.ConfirmPassword[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-semibold">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegistrationPage;
