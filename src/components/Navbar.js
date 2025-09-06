import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [userData, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  },[]);


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-lg border-b rounded-b-2xl">
      {/* Logo / App Name */}
      <h3 className="text-2xl font-bold text-blue-600">📝 Todo App</h3>

      {/* Right Section */}
      {userData && (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium hidden sm:block">
            Hello, {userData.name}
          </span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
