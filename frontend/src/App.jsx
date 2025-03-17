import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReportsPage from "./pages/ReportsPage";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import UploadReport from "./pages/UploadReport";

import {ForgotPassword, ResetPassword}  from "./pages/ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/users/check-auth", { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(res.data.isAuthenticated);
        if (res.data.isAuthenticated) {
          fetchUserDetails();
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("/api/v1/users/current-user", { withCredentials: true });
      setUser(res.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element = {<Contact/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="reports" element = {<ReportsPage user = {user}/>} />
        <Route path="signup" element = {<Signup/>} />

        {/* reset password */}
        <Route path="forgot-password" element = {<ForgotPassword/>} />
        <Route path="/reset-password" element = {<ResetPassword/>}/>
        {/* Protected Route: Only Admin Can Access */}
        <Route
          path="/admin/upload"
          element={isLoggedIn && user?.isAdmin ? <UploadReport /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer
        description="Daya Society is a non-profit organization committed to transforming lives through sustainable development initiatives."
        socials={[
          { name: "Facebook", link: "https://facebook.com" },
          { name: "Twitter", link: "https://twitter.com" },
          { name: "Instagram", link: "https://instagram.com" },
          { name: "LinkedIn", link: "https://linkedin.com" },
        ]}
      />
    </Router>
  );
}

export default App;
