import { useState } from "react";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        {/* Toggle */}
        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 ${
              isLogin ? "bg-blue-600 text-white" : "bg-white text-gray-600"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 ${
              !isLogin ? "bg-blue-600 text-white" : "bg-white text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <AuthForm isLogin={isLogin} />
      </div>
    </div>
  );
};

export default Auth;
