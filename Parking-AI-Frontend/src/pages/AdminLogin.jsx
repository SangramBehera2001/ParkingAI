import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Mail } from "lucide-react";
import API from "../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await API.post("/auth/admin/login", form);
      localStorage.setItem("adminToken", response.data.data.token);
      localStorage.setItem("adminUser", JSON.stringify(response.data.data.user));
      navigate("/admin");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-600 flex items-center justify-center"><ShieldCheck className="text-white" size={40} /></div>
          <h1 className="text-3xl font-bold text-white mt-6">Admin Portal</h1>
          <p className="text-gray-300 mt-2 text-sm">Secure QR Vehicle Management System</p>
        </div>
        {error && <div className="mt-5 bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded-xl">{error}</div>}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div className="flex items-center bg-white/10 border border-white/10 rounded-xl px-4">
            <Mail className="text-gray-400" size={18} />
            <input type="email" placeholder="Admin email" value={form.email} required
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full bg-transparent px-3 py-3 text-white outline-none" />
          </div>
          <div className="flex items-center bg-white/10 border border-white/10 rounded-xl px-4">
            <Lock className="text-gray-400" size={18} />
            <input type="password" placeholder="Password" value={form.password} required
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full bg-transparent px-3 py-3 text-white outline-none" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-60">
            {loading ? "Signing in..." : "Secure Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
