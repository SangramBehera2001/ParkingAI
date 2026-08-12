import { PhoneCall } from "lucide-react";

const ProductDemo = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            See It In Action
          </h2>
          <p className="mt-3 text-gray-600">
            Scan QR → View Details → Call Securely
          </p>
        </div>

        {/* Demo Layout */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 items-center">
          {/* 🔹 QR Section */}
          <div className="flex justify-center">
            <div className="bg-gray-50 p-6 rounded-2xl shadow text-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=DemoQR"
                alt="QR Demo"
                className="mx-auto"
              />
              <p className="mt-4 text-sm text-gray-500">
                Scan this QR to view vehicle details
              </p>
            </div>
          </div>

          {/* 🔹 Scan Result UI */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Vehicle Details
            </h3>

            <div className="space-y-3 text-gray-700 text-sm">
              <p>
                <span className="font-medium">Owner:</span> Krishna Patro
              </p>

              <p>
                <span className="font-medium">Vehicle:</span> AP39 AB 1234
              </p>

              <p>
                <span className="font-medium">Phone:</span> +91******1234
              </p>
            </div>

            {/* Call Button */}
            <button className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              <PhoneCall size={18} />
              Call Owner Securely
            </button>

            <p className="mt-3 text-xs text-gray-500 text-center">
              Your number and owner's number remain private
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
