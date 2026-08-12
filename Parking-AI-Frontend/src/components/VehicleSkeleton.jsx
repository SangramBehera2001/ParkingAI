const VehicleSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-40"></div>

      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-60"></div>
        <div className="h-4 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-52"></div>
      </div>

      <div className="mt-6 flex gap-4">
        <div className="h-10 bg-gray-300 rounded w-28"></div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
};

export default VehicleSkeleton;
