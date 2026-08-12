const EmergencyModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 mx-auto rounded-full flex items-center justify-center">
            <span className="text-3xl">🚨</span>
          </div>

          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            Emergency Alert
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Send an emergency notification to vehicle owner instantly.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition"
            onClick={() => {
              alert("🚨 Emergency alert sent successfully");
              onClose();
            }}
          >
            Send Emergency Alert
          </button>

          <button
            onClick={onClose}
            className="w-full border py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;
