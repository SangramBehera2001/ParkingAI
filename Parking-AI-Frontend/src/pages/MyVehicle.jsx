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
  Download,
  Share2,
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

  const [qrMap, setQrMap] = useState({});
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
      console.error("Failed to fetch vehicles:", err);
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
        .includes(search.toLowerCase())
    );
  }, [search, vehicles]);

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    navigate("/login");
  };

  // 🔥 Generate QR
  const generateQR = async (vehicleId) => {
    try {
      setLoadingId(vehicleId);

      const res = await API.post("/tokens", {
        vehicleId,
      });

      console.log("QR API response:", res.data);

      const qrUrl = res?.data?.data?.qrCodeUrl;

      console.log("Generated QR URL:", qrUrl);

      if (!qrUrl) {
        throw new Error("Backend did not return QR URL");
      }

      setQrMap((prev) => ({
        ...prev,
        [vehicleId]: qrUrl,
      }));
    } catch (err) {
      console.error(
        "QR generation failed:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "QR generation failed"
      );
    } finally {
      setLoadingId(null);
    }
  };

  // 📋 Copy QR Link
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      alert("QR link copied!");
    } catch (err) {
      console.error("Copy failed:", err);

      alert("Unable to copy QR link");
    }
  };

  // ⬇️ Download QR Image
  const downloadQR = async (qrUrl, vehicleNumber) => {
    try {
      const response = await fetch(qrUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch QR image");
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = `${vehicleNumber || "vehicle"}-QR.png`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("QR download failed:", err);

      // Fallback
      try {
        const link = document.createElement("a");

        link.href = qrUrl;
        link.download = `${vehicleNumber || "vehicle"}-QR.png`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      } catch (fallbackError) {
        console.error(
          "QR download fallback failed:",
          fallbackError
        );

        alert("Unable to download QR image");
      }
    }
  };

  // 📤 Share QR
  const shareQR = async (qrUrl, vehicle) => {
    try {
      if (!qrUrl) {
        throw new Error("QR URL is missing");
      }

      /*
       * Convert relative URLs into absolute URLs.
       *
       * Example:
       * /qr/abc123
       *
       * becomes:
       * http://localhost:5173/qr/abc123
       */
      let shareUrl = null;

      try {
        const parsedUrl = new URL(
          qrUrl,
          window.location.origin
        );

        /*
         * Only use HTTP/HTTPS URLs as the `url`
         * property of navigator.share().
         */
        if (
          parsedUrl.protocol === "http:" ||
          parsedUrl.protocol === "https:"
        ) {
          shareUrl = parsedUrl.href;
        }
      } catch (urlError) {
        console.error(
          "QR URL could not be converted:",
          urlError
        );
      }

      console.log("Original QR URL:", qrUrl);
      console.log("Share URL:", shareUrl);

      /*
       * If we have a valid HTTP/HTTPS URL,
       * share it normally.
       */
      if (navigator.share && shareUrl) {
        const shareData = {
          title: `Vehicle QR - ${vehicle.vehicleNumber}`,
          text: `QR code for vehicle ${vehicle.vehicleNumber}`,
          url: shareUrl,
        };

        await navigator.share(shareData);

        return;
      }

      /*
       * If the URL is not suitable for the `url`
       * property, put it inside the text instead.
       *
       * This avoids:
       * "Invalid URL"
       */
      if (navigator.share) {
        const shareData = {
          title: `Vehicle QR - ${vehicle.vehicleNumber}`,
          text: `QR code for vehicle ${vehicle.vehicleNumber}\n\n${qrUrl}`,
        };

        await navigator.share(shareData);

        return;
      }

      /*
       * Browser doesn't support navigator.share().
       * Copy the link instead.
       */
      const fallbackText = shareUrl || qrUrl;

      await navigator.clipboard.writeText(fallbackText);

      alert(
        "Sharing is not supported in this browser. QR link copied instead!"
      );
    } catch (err) {
      /*
       * User closed the native share dialog.
       * This is not actually an error.
       */
      if (err?.name === "AbortError") {
        return;
      }

      console.error("Share failed:", err);

      /*
       * Final fallback:
       * Copy the QR URL to clipboard.
       */
      try {
        const fallbackUrl = new URL(
          qrUrl,
          window.location.origin
        ).href;

        await navigator.clipboard.writeText(fallbackUrl);

        alert(
          "Unable to open sharing. QR link copied instead!"
        );
      } catch (copyError) {
        console.error(
          "Fallback copy failed:",
          copyError
        );

        try {
          await navigator.clipboard.writeText(qrUrl);

          alert(
            "Unable to open sharing. QR link copied instead!"
          );
        } catch (finalError) {
          console.error(
            "Final copy failed:",
            finalError
          );

          alert("Unable to share QR link");
        }
      }
    }
  };

  // ❌ Delete
  const deleteVehicle = async (id) => {
    if (!confirm("Delete this vehicle?")) return;

    try {
      await API.delete(`/vehicles/${id}`);

      fetchVehicles();
    } catch (err) {
      console.error("Delete vehicle failed:", err);
    }
  };

  // ✏️ Open Edit
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

            <p className="text-gray-500 text-sm">
              Manage QR vehicles smartly
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              Add Vehicle
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">

          {/* TOTAL */}
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">
              Total
            </p>

            <h2 className="text-xl font-bold">
              {vehicles.length}
            </h2>
          </div>

          {/* WITH PHONE */}
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">
              With Phone
            </p>

            <h2 className="text-xl font-bold">
              {vehicles.filter((v) => v.phone).length}
            </h2>
          </div>

          {/* WITHOUT PHONE */}
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">
              Without Phone
            </p>

            <h2 className="text-xl font-bold">
              {vehicles.filter((v) => !v.phone).length}
            </h2>
          </div>

        </div>

        {/* 🔍 SEARCH */}
        <div className="mt-6 relative">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search vehicle..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
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
                      <User size={16} />
                      {v.ownerName || "N/A"}
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

                    {/* QR */}
                    <button
                      onClick={() =>
                        generateQR(v.id)
                      }
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                      {loadingId === v.id ? (
                        <Spinner />
                      ) : (
                        <QrCode size={16} />
                      )}

                      QR
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        openEdit(v)
                      }
                      className="border px-3 py-2 rounded-lg text-sm flex gap-1 items-center hover:bg-gray-50 transition"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        deleteVehicle(v.id)
                      }
                      className="border border-red-500 text-red-600 px-3 py-2 rounded-lg text-sm flex gap-1 items-center hover:bg-red-50 transition"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>

                  </div>

                  {/* 🔥 QR PREVIEW */}
                  {qrMap[v.id] && (
                    <div className="mt-4 border rounded-lg p-3 text-center">

                      {/* QR IMAGE */}
                      <img
                        src={qrMap[v.id]}
                        alt={`QR code for ${v.vehicleNumber}`}
                        className="w-32 mx-auto"
                      />

                      {/* QR ACTIONS */}
                      <div className="mt-3 flex justify-center items-center gap-4 flex-wrap">

                        {/* COPY LINK */}
                        <button
                          onClick={() =>
                            copyText(
                              qrMap[v.id]
                            )
                          }
                          className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                          title="Copy QR link"
                        >
                          <Copy size={14} />
                          Copy Link
                        </button>

                        {/* DOWNLOAD */}
                        <button
                          onClick={() =>
                            downloadQR(
                              qrMap[v.id],
                              v.vehicleNumber
                            )
                          }
                          className="text-xs flex items-center gap-1 text-green-600 hover:text-green-800 transition"
                          title="Download QR image"
                        >
                          <Download size={14} />
                          Download
                        </button>

                        {/* SHARE */}
                        <button
                          onClick={() =>
                            shareQR(
                              qrMap[v.id],
                              v
                            )
                          }
                          className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-800 transition"
                          title="Share QR"
                        >
                          <Share2 size={14} />
                          Share
                        </button>

                      </div>

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
          onClose={() =>
            setOpen(false)
          }
          refresh={fetchVehicles}
        />
      )}

      {editOpen && (
        <EditVehicleModal
          vehicle={selectedVehicle}
          onClose={() =>
            setEditOpen(false)
          }
          refresh={fetchVehicles}
        />
      )}

    </div>
  );
};

export default MyVehicle;