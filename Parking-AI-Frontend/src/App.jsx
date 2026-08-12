// // import React from "react";
// import Home from "./pages/Home";

// import { Routes, Route } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import MyVehicle from "./pages/MyVehicle";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import QRModal from "./components/QRModal";
// import Scan from "./pages/Scan";
// import Scanner from "./pages/Scanner";
// import ScanHistory from "./pages/ScanHistory";
// import AdminDashboard from "./pages/AdminDashboard";

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/scan/:token" element={<Scan />} />
//         <Route path="/scanner" element={<Scanner />} />
//         <Route path="/scan-history" element={<ScanHistory />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         {/* 🔑 QR Modal */}
//         <Route path="/qr" element={<QRModal />} />

//         {/* 🔐 Protected Route */}
//         <Route
//           path="/my-vehicle"
//           element={
//             <ProtectedRoute>
//               <MyVehicle />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyVehicle from "./pages/MyVehicle";
import Scan from "./pages/Scan";
import Scanner from "./pages/Scanner";
import ScanHistory from "./pages/ScanHistory";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

import QRModal from "./components/QRModal";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* =========================
          PUBLIC ROUTES
      ========================== */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/scan/:token" element={<Scan />} />

      <Route path="/scanner" element={<Scanner />} />

      <Route path="/scan-history" element={<ScanHistory />} />

      {/* QR Preview */}
      <Route path="/qr" element={<QRModal />} />

      {/* =========================
          USER PROTECTED ROUTES
      ========================== */}
      <Route
        path="/my-vehicle"
        element={
          <ProtectedRoute>
            <MyVehicle />
          </ProtectedRoute>
        }
      />

      {/* =========================
          ADMIN AUTH
      ========================== */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* =========================
          ADMIN PROTECTED ROUTE
      ========================== */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
