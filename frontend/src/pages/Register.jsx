import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName || !username || !email || !password) {
      toast.error("All fields are required!", { position: "top-center" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        { fullName, username, email, password }
      );

      if (response.data.success) {
        toast.success("Account created successfully! Redirecting to login...", { autoClose: 2000 });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      if (error.response?.data?.message?.includes("already exists")) {
        toast.error("Account already exists. Please login.", { autoClose: 2000 });
      } else {
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span className="text-green-500 cursor-pointer" onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
