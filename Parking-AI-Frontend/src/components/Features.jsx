import {
  Shield,
  Phone,
  QrCode,
  RefreshCw,
  Lock,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: <QrCode className="text-blue-600" size={28} />,
    title: "QR-Based Access",
    desc: "Each vehicle gets a unique QR code for instant identification.",
  },
  {
    icon: <Phone className="text-blue-600" size={28} />,
    title: "Masked Calling",
    desc: "Connect without revealing phone numbers using proxy routing.",
  },
  {
    icon: <Shield className="text-blue-600" size={28} />,
    title: "Privacy First",
    desc: "User data is encrypted and never exposed publicly.",
  },
  {
    icon: <RefreshCw className="text-blue-600" size={28} />,
    title: "Auto Proxy Rotation",
    desc: "Virtual numbers are reused safely after each call session.",
  },
  {
    icon: <Lock className="text-blue-600" size={28} />,
    title: "Secure Tokens",
    desc: "Every QR uses a unique token for safe backend lookup.",
  },
  {
    icon: <BarChart3 className="text-blue-600" size={28} />,
    title: "Call Tracking",
    desc: "Track call status, duration, and logs in real-time.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Powerful Features
        </h2>

        <p className="mt-3 text-gray-600">
          Built for security, privacy, and seamless communication
        </p>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 border rounded-xl hover:shadow-md transition"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>

              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
