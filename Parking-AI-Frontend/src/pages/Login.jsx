import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await API.post("/auth/login", form);
      localStorage.removeItem("userId");
      localStorage.setItem("authToken", response.data.data.token);
      localStorage.setItem("authUser", JSON.stringify(response.data.data.user));
      navigate("/my-vehicle");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mt-2">Login to your account</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type="email" value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="Email Address" required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type={showPassword ? "text" : "password"} value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Password" required
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            <button type="button" onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-2.5 text-gray-400" aria-label="Toggle password visibility">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-5">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
