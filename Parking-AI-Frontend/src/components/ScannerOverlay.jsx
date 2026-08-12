const ScannerOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Dark background */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Scan box */}
      <div className="relative w-64 h-64 border-2 border-white rounded-xl">
        {/* Laser */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-scan"></div>

        {/* Corners */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-500"></div>
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-500"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-500"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-500"></div>
      </div>
    </div>
  );
};

export default ScannerOverlay;
