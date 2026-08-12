import { Link } from "react-router-dom";
import { QrCode, Info } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* 🔹 Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Scan. Connect. <span className="text-blue-600">Stay Private.</span>
          </h1>

          <p className="mt-5 text-gray-600 text-base sm:text-lg">
            Instantly connect with vehicle owners using QR codes — without
            exposing personal phone numbers. Secure, fast, and privacy-first
            communication.
          </p>

          {/* 🔹 Flow */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2 text-sm text-gray-500">
            <span className="bg-white px-3 py-1 rounded shadow">Scan QR</span>
            <span>→</span>
            <span className="bg-white px-3 py-1 rounded shadow">
              View Details
            </span>
            <span>→</span>
            <span className="bg-white px-3 py-1 rounded shadow">
              Call Securely
            </span>
          </div>

          {/* 🔹 CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {/* 🔥 SCAN BUTTON (NEW) */}
            <Link
              to="/scanner"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow"
            >
              <QrCode size={18} />
              Scan QR
            </Link>

            {/* 🔥 GENERATE QR (LOGIN REQUIRED) */}
            <Link
              to="/my-vehicle"
              className="bg-white border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition text-center"
            >
              Generate QR
            </Link>

            {/* 🔥 HOW IT WORKS (SCROLL) */}
            <a
              href="#how-it-works"
              className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <Info size={16} />
              How It Works
            </a>
          </div>
        </div>

        {/* 🔹 Right Visual */}
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://yourdomain.com/scan/demo123"
              alt="QR Code"
              className="w-48 sm:w-56 md:w-64 mx-auto"
            />

            <p className="mt-4 text-gray-500 text-sm">
              Scan using your camera to test
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
