import { Bell, Search } from "lucide-react";

const AdminTopbar = () => {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-xl w-80">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative">
          <Bell className="text-gray-600" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="admin"
            className="w-10 h-10 rounded-full"
          />

          <div className="hidden sm:block">
            <h3 className="text-sm font-semibold">Admin</h3>

            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
