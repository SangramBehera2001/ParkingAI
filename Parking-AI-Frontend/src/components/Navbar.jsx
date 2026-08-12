import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setIsOpen(false);
    navigate("/login");
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      ["home", "about", "contact"].forEach((section) => {
        const element = document.getElementById(section);
        const rect = element?.getBoundingClientRect();
        if (rect && rect.top <= 120 && rect.bottom >= 120) setActiveSection(section);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItem = (id, label) => (
    <button onClick={() => scrollToSection(id)}
      className={`transition font-medium ${activeSection === id ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>
      {label}
    </button>
  );

  const authAction = isLoggedIn ? (
    <button onClick={logout} className="text-red-600 hover:text-red-700 font-medium">Logout</button>
  ) : (
    <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Sign In</Link>
  );

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">QR Vehicle</Link>
        <div className="hidden md:flex items-center gap-10">
          {navItem("home", "Home")}{navItem("about", "About")}{navItem("contact", "Contact")}
          <Link to={isLoggedIn ? "/my-vehicle" : "/login"}>My Vehicle</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <div className="hidden md:block">{authAction}</div>
        <button className="md:hidden" onClick={() => setIsOpen((value) => !value)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 shadow-lg">
          <div>{navItem("home", "Home")}</div><div>{navItem("about", "About")}</div><div>{navItem("contact", "Contact")}</div>
          <Link className="block" to={isLoggedIn ? "/my-vehicle" : "/login"}>My Vehicle</Link>
          <Link className="block" to="/admin">Admin</Link>
          <div>{authAction}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
