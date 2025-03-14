import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log form values before making the request
    console.log("Full Name:", fullName);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  
    try {
      // Make the POST request to the backend
      const response = await axios.post("/api/v1/users/register", {
        fullName,
        username,
        email,
        password,
      });
  
      // Log the response data
      console.log("Signup Response Data:", response.data);
  
      // Set success message from the response
      setMessage(response.data.message);  
      setError("");  // Clear any previous errors
  
      // Show modal popup
      setIsModalOpen(true);
  
      // Log success
      console.log("Signup successful:", response);
  
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      // Clear message on error
      setMessage("");  
  
      // Log error and set error message
      if (error.response) {
        console.error("Signup Error Response:", error.response);
        setError(error.response.data.message || "An error occurred");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error during signup:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h2 className="text-center text-2xl font-bold">Signup</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Signup
        </button>
      </form>

      {/* Modal Popup to show success or error message */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            {message && <p className="text-green-500">{message}</p>} {/* Success message */}
            {error && <p className="text-red-500">{error}</p>} {/* Error message */}
          </div>
        </div>
      )}
    </div>
  );
};

export { Signup };
