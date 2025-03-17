import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/v1/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        toast.success("Login successful!", { position: "bottom-left", autoClose: 2000 });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-200">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* ✅ Forgot Password and Sign Up Links */}
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <Link to="/forgot-password" className="hover:text-green-500">
              Forgot Password?
            </Link>
            <Link to="/signup" className="hover:text-green-500">
              Create an Account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5 mr-2"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      {/* ✅ Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
