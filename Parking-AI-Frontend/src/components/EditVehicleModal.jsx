import { useState } from "react";
import API from "../services/api";

const EditVehicleModal = ({ vehicle, onClose, refresh }) => {
  const [vehicleNumber, setVehicleNumber] = useState(vehicle.vehicleNumber);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      await API.put(`/vehicles/${vehicle.id}`, {
        vehicleNumber: vehicleNumber.trim().toUpperCase(),
      });
      await refresh();
      onClose();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <input value={vehicleNumber} onChange={(event) => setVehicleNumber(event.target.value)}
            className="w-full border p-2 rounded mb-3" placeholder="Vehicle Number" required />
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60">
              {loading ? "Updating..." : "Update"}
            </button>
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleModal;
