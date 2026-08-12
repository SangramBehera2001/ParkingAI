import { useState } from "react";
import EmergencyModal from "../components/EmergencyModal";
import LiveLocationCard from "../components/LiveLocationCard";

const ScanHistory = () => {
  const [openEmergency, setOpenEmergency] = useState(false);

  // 🔥 Dummy scan history
  const history = [
    {
      id: 1,
      vehicle: "AP39 AB 1234",
      scannedBy: "Anonymous User",
      time: "10 mins ago",
      status: "Successful",
    },
    {
      id: 2,
      vehicle: "TS09 XY 9087",
      scannedBy: "Parking Security",
      time: "1 hour ago",
      status: "Emergency Alert",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Scan Dashboard</h1>

            <p className="text-gray-500 mt-1">
              Monitor scan activity & emergency alerts
            </p>
          </div>

          <button
            onClick={() => setOpenEmergency(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl shadow-lg transition"
          >
            🚨 Emergency Alert
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-gray-500 text-sm">Total Scans</h3>
            <p className="text-3xl font-bold mt-2">124</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-gray-500 text-sm">Alerts Sent</h3>
            <p className="text-3xl font-bold mt-2 text-red-600">8</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-gray-500 text-sm">Active Vehicles</h3>
            <p className="text-3xl font-bold mt-2 text-blue-600">24</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* History */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">🧾 Scan History</h2>

              <button className="text-sm text-blue-600 hover:underline">
                View All
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.vehicle}
                    </h3>

                    <p className="text-sm text-gray-500">{item.scannedBy}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">{item.time}</p>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        item.status === "Successful"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <LiveLocationCard />
        </div>
      </div>

      {/* Emergency Modal */}
      {openEmergency && (
        <EmergencyModal onClose={() => setOpenEmergency(false)} />
      )}
    </div>
  );
};

export default ScanHistory;
