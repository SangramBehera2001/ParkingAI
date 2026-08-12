import {
  LayoutDashboard,
  Car,
  ShieldAlert,
  ScanLine,
  Users,
} from "lucide-react";

const AdminSidebar = () => {
  return (
    <div className="w-72 bg-white border-r min-h-screen hidden lg:flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">QR Vehicle</h1>

        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl">
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-xl transition">
          <Car size={18} />
          Vehicles
        </button>

        <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-xl transition">
          <Users size={18} />
          Users
        </button>

        <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-xl transition">
          <ScanLine size={18} />
          Scan Logs
        </button>

        <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-xl transition">
          <ShieldAlert size={18} />
          Emergency Alerts
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
