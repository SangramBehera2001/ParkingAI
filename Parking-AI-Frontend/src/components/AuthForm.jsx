import { useState } from "react";

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Login Data:", formData);
    } else {
      console.log("Register Data:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name (Register only) */}
      {!isLogin && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Phone (Register only) */}
      {!isLogin && (
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        {isLogin ? "Sign In" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
