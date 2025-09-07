import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Tasks from "./components/Tasks";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  },[token]);

  return (
    <Router>
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="*" element={<Tasks/>} />
      </Routes>
    </>
  </Router>
  
  )
}

export default App