import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
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
  }, [setIsLoggedIn]);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("/api/v1/users/current-user", { withCredentials: true });
      setUser(res.data.data); // Store user data
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/users/logout", {}, { withCredentials: true });

      if (response.status === 200) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        toast.success("You have been logged out successfully!", { position: "bottom-left", autoClose: 1000 });
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Server error: Unable to log out.");
    }
  };

  return (
    <header className="bg-green-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">🌿 Daya Society</h1>
      </div>

      <nav>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
          <li><Link to="/reports" className="hover:text-gray-300">Reports</Link></li>

          {/* Show "Upload Report" only if the user is an admin */}
          {isLoggedIn && user?.isAdmin && (
            <li>
              <Link to="/admin/upload" className="hover:text-gray-300 bg-blue-600 px-3 py-1 rounded">
                Upload Report
              </Link>
            </li>
          )}

          {isLoggedIn ? (
            <li><button onClick={handleLogout} className="hover:text-gray-300">Logout</button></li>
          ) : (
            <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
