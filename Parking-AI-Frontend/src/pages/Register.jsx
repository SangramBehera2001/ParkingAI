import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      localStorage.removeItem("userId");
      localStorage.setItem("authToken", response.data.data.token);
      localStorage.setItem("authUser", JSON.stringify(response.data.data.user));
      navigate("/my-vehicle");
    } catch (requestError) {
      setError(
        requestError.response?.data?.errors?.[0]?.message ||
          requestError.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 text-sm mt-2">Secure your vehicle with QR</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name"
              minLength={2} required className={inputClass} />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="Email Address" required className={inputClass} />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              placeholder="Phone Number" minLength={10} required className={inputClass} />
          </div>

          {["password", "confirmPassword"].map((field) => (
            <div className="relative" key={field}>
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type={showPassword ? "text" : "password"} name={field} value={form[field]}
                onChange={handleChange} minLength={8} required
                placeholder={field === "password" ? "Password (minimum 8 characters)" : "Confirm Password"}
                className={`${inputClass} pr-10`} />
              {field === "password" && (
                <button type="button" onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-2.5 text-gray-400" aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          ))}

          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
