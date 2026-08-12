const vehicles = [
  {
    id: 1,
    number: "AP39 AB 1234",
    owner: "Krishna",
    phone: "+91******1234",
  },
  {
    id: 2,
    number: "TS09 XY 9087",
    owner: "Rahul",
    phone: "+91******9087",
  },
];

const VehicleTable = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 overflow-x-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Registered Vehicles</h2>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          Export
        </button>
      </div>

      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-3">Vehicle</th>
            <th className="pb-3">Owner</th>
            <th className="pb-3">Phone</th>
            <th className="pb-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} className="border-b last:border-0">
              <td className="py-4">{v.number}</td>
              <td>{v.owner}</td>
              <td>{v.phone}</td>

              <td>
                <button className="text-red-600 text-sm hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
