import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import API from "../services/api";

const Scan = () => {
  const { token } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Fetch scan data from backend
  const fetchScanData = async (scanToken) => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(`/scan/${scanToken}`);
      setData(res.data.data);
    } catch {
      setError("Invalid or expired QR code");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 If URL token exists
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (token) fetchScanData(token);
  }, [token]);

  // 🔥 Start Camera Scanner
  useEffect(() => {
    if (token) return; // skip if already scanned

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false,
    );

    scanner.render(
      (decodedText) => {
        scanner.clear();
        const extractedToken = decodedText.split("/").pop();
        fetchScanData(extractedToken);
      },
      (err) => {
        console.warn(err);
      },
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [token]);

  // 🔥 Upload QR Image
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const scanner = new Html5QrcodeScanner("reader");

    scanner
      .scanFile(file, true)
      .then((decodedText) => {
        const extractedToken = decodedText.split("/").pop();
        fetchScanData(extractedToken);
      })
      .catch(() => {
        setError("Failed to scan QR from image");
      });
  };

  // 🔥 Call Owner
  const handleCall = () => {
    if (data?.phone) {
      window.location.href = `tel:${data.phone}`;
    }
  };

  // 🔥 Send Message (SMS + WhatsApp)
  const handleMessage = () => {
    if (!data?.phone) return;

    const message = encodeURIComponent(
      `Hello, I scanned your vehicle QR (${data.vehicleNumber}). Please contact me.`,
    );

    // 📱 Try SMS
    window.location.href = `sms:${data.phone}?body=${message}`;

    // 🌐 Optional: WhatsApp fallback
    setTimeout(() => {
      window.open(`https://wa.me/${data.phone}?text=${message}`, "_blank");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-24">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">QR Scanner</h2>

        {/* 🔥 Camera Scanner */}
        {!data && (
          <>
            <div className="relative">
              <div id="reader" className="w-full" />

              {/* 🔥 Scan Animation */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-1 bg-red-500 animate-pulse"></div>
              </div>
            </div>

            {/* Upload */}
            <div className="mt-4">
              <label className="text-sm text-gray-600 block mb-1">
                Upload QR Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full border p-2 rounded-lg text-sm"
              />
            </div>
          </>
        )}

        {/* Loading */}
        {loading && <p className="text-gray-500 mt-4">Processing...</p>}

        {/* Error */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* ✅ Result */}
        {data && (
          <>
            <h3 className="text-lg font-semibold mt-4 text-gray-800">
              Vehicle Found
            </h3>

            <div className="mt-4 text-left space-y-2 text-sm text-gray-700">
              <p>
                <b>Vehicle:</b> {data.vehicleNumber}
              </p>
              <p>
                <b>Owner:</b> {data.ownerName}
              </p>
              <p>
                <b>Phone:</b> {data.phone}
              </p>
            </div>

            {/* 🔥 Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCall}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                📞 Call
              </button>

              <button
                onClick={handleMessage}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                💬 Message
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Scan;
