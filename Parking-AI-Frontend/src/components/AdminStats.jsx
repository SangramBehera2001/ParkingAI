const stats = [
  {
    title: "Total Users",
    value: "1,284",
    color: "text-blue-600",
  },
  {
    title: "Registered Vehicles",
    value: "3,942",
    color: "text-green-600",
  },
  {
    title: "QR Scans",
    value: "12,320",
    color: "text-purple-600",
  },
  {
    title: "Emergency Alerts",
    value: "24",
    color: "text-red-600",
  },
];

const AdminStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-sm text-gray-500">{item.title}</p>

          <h2 className={`text-3xl font-bold mt-3 ${item.color}`}>
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
