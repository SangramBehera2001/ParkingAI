import { UserPlus, QrCode, ScanLine, PhoneCall } from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={28} className="text-blue-600" />,
    title: "Register Vehicle",
    desc: "Owner adds vehicle details and phone number securely into the system.",
  },
  {
    icon: <QrCode size={28} className="text-blue-600" />,
    title: "Generate QR Code",
    desc: "System creates a unique QR linked to your vehicle (no personal data stored in QR).",
  },
  {
    icon: <ScanLine size={28} className="text-blue-600" />,
    title: "Scan QR",
    desc: "Anyone can scan the QR to view safe vehicle details and masked contact.",
  },
  {
    icon: <PhoneCall size={28} className="text-blue-600" />,
    title: "Call Securely",
    desc: "Call is routed through a virtual number so real phone numbers stay hidden.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          How It Works
        </h2>

        <p className="mt-3 text-gray-600">
          Simple 4-step process to connect securely
        </p>

        {/* Steps */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                {/* Step Number */}
                <div className="w-8 h-8 mb-4 mx-auto flex items-center justify-center bg-blue-600 text-white rounded-full text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-4 flex justify-center">{step.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
              </div>

              {/* Arrow (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-[-20px] transform -translate-y-1/2 text-gray-400">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
