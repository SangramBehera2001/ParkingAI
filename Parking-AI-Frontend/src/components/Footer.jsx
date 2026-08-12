import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        {/* 🔹 Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">QR Vehicle</h2>
          <p className="mt-4 text-sm text-gray-400">
            A smart QR-based vehicle contact system that ensures secure and
            private communication between users.
          </p>
        </div>

        {/* 🔹 Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* 🔹 Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@qrvehicle.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+91 90000 00000</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} QR Vehicle System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
