import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const Scanner = () => {
  const navigate = useNavigate();

  const scannerRef = useRef(null);
  const startedRef = useRef(false);
  const stoppedRef = useRef(false);
  const mountedRef = useRef(true);

  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    mountedRef.current = true;

    const scanner = new Html5Qrcode("qr-reader");

    scannerRef.current = scanner;
    startedRef.current = false;
    stoppedRef.current = false;

    const stopScanner = async () => {
      // Never call stop() unless the scanner actually started.
      if (!scannerRef.current || !startedRef.current || stoppedRef.current) {
        return;
      }

      // Prevent multiple stop() calls.
      stoppedRef.current = true;

      try {
        await scannerRef.current.stop();

        console.log("Scanner stopped successfully");

        if (mountedRef.current) {
          setScanning(false);
        }
      } catch (err) {
        console.error("Error stopping scanner:", err);

        if (mountedRef.current) {
          setScanning(false);
        }
      }
    };

    const startScanner = async () => {
      try {
        if (mountedRef.current) {
          setError("");
          setScanning(true);
        }

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          async (decodedText) => {
            console.log("Scanned:", decodedText);

            // Prevent the callback from firing multiple times
            // while we are processing the same QR.
            if (stoppedRef.current) {
              return;
            }

            // Stop the camera first.
            await stopScanner();

            // Make sure we actually received something.
            if (!decodedText) {
              return;
            }

            /*
             * Expected QR format:
             *
             * https://your-domain.com/scan/TOKEN
             *
             * We only need the last part:
             * TOKEN
             */
            try {
              const url = new URL(decodedText);
              const parts = url.pathname.split("/").filter(Boolean);

              const token = parts[parts.length - 1];

              if (!token) {
                throw new Error("QR code does not contain a valid token");
              }

              console.log("QR Token:", token);

              if (mountedRef.current) {
                navigate(`/scan/${token}`);
              }
            } catch (err) {
              console.error("Invalid QR code:", err);

              if (mountedRef.current) {
                setError("Invalid ParkingAI QR code.");
              }
            }
          },
          () => {
            // QR decode failures happen continuously while
            // the camera is searching. We intentionally ignore them.
          }
        );

        // IMPORTANT:
        // start() completed successfully, so now stop()
        // is safe to use.
        startedRef.current = true;

        if (mountedRef.current) {
          setScanning(true);
        }

        console.log("Scanner started successfully");
      } catch (err) {
        console.error("Scanner start error:", err);

        startedRef.current = false;

        if (mountedRef.current) {
          setScanning(false);
          setError(
            "Camera access denied, unavailable, or not supported."
          );
        }
      }
    };

    startScanner();

    // Cleanup when the component unmounts.
    return () => {
      mountedRef.current = false;

      /*
       * Do NOT blindly call scanner.stop().
       *
       * React can unmount this component while scanner.start()
       * is still waiting for the camera.
       */
      stopScanner();

      scannerRef.current = null;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pt-20">
      <h1 className="text-2xl font-bold text-gray-800">
        Scan QR Code
      </h1>

      <p className="text-gray-500 text-sm mt-1">
        Point your camera at a vehicle QR
      </p>

      {/* Scanner Box */}
      <div className="mt-6 w-full max-w-sm bg-white p-4 rounded-xl shadow">
        <div id="qr-reader" className="w-full"></div>
      </div>

      {/* Status */}
      {scanning && (
        <p className="mt-4 text-green-600 text-sm">
          🔍 Scanning...
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-500 text-sm text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default Scanner;