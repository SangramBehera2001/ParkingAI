import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import AdminStats from "../components/AdminStats";
import VehicleTable from "../components/VehicleTable";
import RecentScans from "../components/RecentScans";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 🔥 Logout Function
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* =========================
          SIDEBAR
      ========================== */}
      <AdminSidebar />

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* =========================
            TOPBAR
        ========================== */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            {/* Left */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                QR Vehicle Management System
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Existing Topbar */}
              <AdminTopbar />

              {/* Logout */}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* =========================
            PAGE CONTENT
        ========================== */}
        <div className="p-4 sm:p-6 space-y-6 overflow-x-hidden">
          {/* Stats */}
          <AdminStats />

          {/* Grid Layout */}
          <div className="grid xl:grid-cols-3 gap-6">
            {/* Vehicle Table */}
            <div className="xl:col-span-2">
              <VehicleTable />
            </div>

            {/* Recent Scans */}
            <div>
              <RecentScans />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
