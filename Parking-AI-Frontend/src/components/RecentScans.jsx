const scans = [
  {
    id: 1,
    vehicle: "AP39 AB 1234",
    status: "Success",
    time: "5 mins ago",
  },
  {
    id: 2,
    vehicle: "TS09 XY 9087",
    status: "Emergency",
    time: "20 mins ago",
  },
];

const RecentScans = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Recent Scans</h2>

        <button className="text-blue-600 text-sm hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {scans.map((scan) => (
          <div
            key={scan.id}
            className="flex justify-between items-center border-b pb-4 last:border-0"
          >
            <div>
              <h3 className="font-medium">{scan.vehicle}</h3>

              <p className="text-sm text-gray-500">{scan.time}</p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full ${
                scan.status === "Success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {scan.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentScans;
