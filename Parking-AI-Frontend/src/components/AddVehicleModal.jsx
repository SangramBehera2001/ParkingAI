import { useState } from "react";
import API from "../services/api";

const AddVehicleModal = ({ onClose, refresh }) => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      await API.post("/vehicles", {
        vehicleNumber: vehicleNumber.trim().toUpperCase(),
      });
      await refresh();
      onClose();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not add the vehicle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800">Add Vehicle</h2>
        <p className="text-gray-500 text-sm mt-1">Enter your vehicle details</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="vehicleNumber" className="text-sm text-gray-600">Vehicle Number</label>
            <input id="vehicleNumber" type="text" placeholder="AP39 AB 1234"
              value={vehicleNumber} onChange={(event) => setVehicleNumber(event.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60">
              {loading ? "Adding..." : "Add"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}
              className="flex-1 border py-2 rounded-lg hover:bg-gray-100">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
