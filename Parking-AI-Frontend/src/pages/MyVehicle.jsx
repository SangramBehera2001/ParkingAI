import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Phone,
  User,
  QrCode,
  Plus,
  Trash2,
  Pencil,
  Search,
  Copy,
  LogOut,
} from "lucide-react";

import AddVehicleModal from "../components/AddVehicleModal";
import EditVehicleModal from "../components/EditVehicleModal";
import VehicleSkeleton from "../components/VehicleSkeleton";
import Spinner from "../components/Spinner";
import API from "../services/api";

const MyVehicle = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  const [qrMap, setQrMap] = useState({}); // store QR per vehicle
  const [loadingId, setLoadingId] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // 🔥 Fetch Vehicles
  const fetchVehicles = async () => {
    try {
      setFetchLoading(true);
      const res = await API.get("/vehicles");
      const data = res?.data?.data || [];
      setVehicles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVehicles();
  }, []);

  // 🔍 Search Filter
  const filtered = useMemo(() => {
    return vehicles.filter((v) =>
      `${v.vehicleNumber} ${v.ownerName}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search, vehicles]);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  // 🔥 Generate QR
  const generateQR = async (vehicleId) => {
    try {
      setLoadingId(vehicleId);

      const res = await API.post("/tokens", { vehicleId });
      const qrUrl = res?.data?.data?.qrCodeUrl;

      setQrMap((prev) => ({
        ...prev,
        [vehicleId]: qrUrl,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  // 📋 Copy
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // ❌ Delete
  const deleteVehicle = async (id) => {
    if (!confirm("Delete this vehicle?")) return;

    try {
      await API.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (v) => {
    setSelectedVehicle(v);
    setEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Car className="text-blue-600" />
              My Vehicles
            </h1>
            <p className="text-gray-500 text-sm">Manage QR vehicles smartly</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              <Plus size={18} /> Add Vehicle
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total</p>
            <h2 className="text-xl font-bold">{vehicles.length}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">With Phone</p>
            <h2 className="text-xl font-bold">
              {vehicles.filter((v) => v.phone).length}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Without Phone</p>
            <h2 className="text-xl font-bold">
              {vehicles.filter((v) => !v.phone).length}
            </h2>
          </div>
        </div>

        {/* 🔍 SEARCH */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* CONTENT */}
        {fetchLoading ? (
          <div className="mt-6 space-y-4">
            <VehicleSkeleton />
            <VehicleSkeleton />
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center bg-white p-8 rounded-xl shadow text-gray-500">
                No results found
              </div>
            ) : (
              filtered.map((v) => (
                <div
                  key={v.id}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
                >
                  {/* TOP */}
                  <div className="flex justify-between">
                    <h2 className="font-semibold truncate">
                      {v.vehicleNumber}
                    </h2>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>

                  {/* INFO */}
                  <div className="mt-3 text-sm space-y-2">
                    <p className="flex gap-2">
                      <User size={16} /> {v.ownerName || "N/A"}
                    </p>

                    <p className="flex gap-2 items-start">
                      <Phone size={16} />
                      <span className="break-all">
                        {v.phone || "Not assigned"}
                      </span>
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => generateQR(v.id)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                      {loadingId === v.id ? <Spinner /> : <QrCode size={16} />}
                      QR
                    </button>

                    <button
                      onClick={() => openEdit(v)}
                      className="border px-3 py-2 rounded-lg text-sm flex gap-1 items-center"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => deleteVehicle(v.id)}
                      className="border text-red-600 px-3 py-2 rounded-lg text-sm flex gap-1 items-center"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>

                  {/* 🔥 QR PREVIEW */}
                  {qrMap[v.id] && (
                    <div className="mt-4 border rounded-lg p-3 text-center">
                      <img
                        src={qrMap[v.id]}
                        alt="QR"
                        className="w-32 mx-auto"
                      />

                      <button
                        onClick={() => copyText(qrMap[v.id])}
                        className="mt-2 text-xs flex items-center gap-1 mx-auto text-blue-600"
                      >
                        <Copy size={14} />
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* MODALS */}
      {open && (
        <AddVehicleModal
          onClose={() => setOpen(false)}
          refresh={fetchVehicles}
        />
      )}

      {editOpen && (
        <EditVehicleModal
          vehicle={selectedVehicle}
          onClose={() => setEditOpen(false)}
          refresh={fetchVehicles}
        />
      )}
    </div>
  );
};

export default MyVehicle;
