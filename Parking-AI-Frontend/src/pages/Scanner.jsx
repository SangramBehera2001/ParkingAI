import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const Scanner = () => {
  const navigate = useNavigate();

  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");

    const startScanner = async () => {
      try {
        setScanning(true);

        await scanner.start(
          { facingMode: "environment" }, // back camera
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            // 🔥 On Scan Success
            console.log("Scanned:", decodedText);

            scanner.stop().then(() => {
              setScanning(false);

              // Extract token from URL
              const token = decodedText.split("/").pop();

              navigate(`/scan/${token}`);
            });
          },
          () => {
            // ignore scan errors
          },
        );
      } catch (err) {
        console.error(err);
        setError("Camera access denied or not supported");
        setScanning(false);
      }
    };

    startScanner();

    return () => {
      scanner.stop().catch(() => {});
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pt-20">
      <h1 className="text-2xl font-bold text-gray-800">Scan QR Code</h1>

      <p className="text-gray-500 text-sm mt-1">
        Point your camera at a vehicle QR
      </p>

      {/* Scanner Box */}
      <div className="mt-6 w-full max-w-sm bg-white p-4 rounded-xl shadow">
        <div id="qr-reader" className="w-full"></div>
      </div>

      {/* Status */}
      {scanning && (
        <p className="mt-4 text-green-600 text-sm">🔍 Scanning...</p>
      )}

      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Scanner;
