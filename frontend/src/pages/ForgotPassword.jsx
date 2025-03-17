import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // 1 min countdown
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  // Function to send OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email!", {position : "top-center", autoClose: 2000});
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/users/forgot-password", { email });

      if (response.data.success) {
        toast.success("OTP sent to your email!", {position: "bottom-left", autoClose: 2000});
        setOtpSent(true);
        setCanResend(false);
        startTimer();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP!", {position: "bottom-left", autoClose: 2000});
    } finally {
      setLoading(false);
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP!", {position: "top-center", autoClose: 2000});
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/v1/users/verify-otp", { email, otp });

      if (response.data.success) {
        toast.success("OTP Verified!");
        setTimeout(() => navigate("/reset-password"), 1000); // Redirect after success
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP!");
    } finally {
      setLoading(false);
    }
  };

  // Timer function for OTP resend
  const startTimer = () => {
    setTimer(60);
    setCanResend(false);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setCanResend(true);
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forgot Password
        </h2>

        {!otpSent ? (
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button
              onClick={handleSendOtp}
              className="w-full mt-4 px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div>
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={loading}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center mt-4">
              {canResend ? (
                <button
                  onClick={handleSendOtp}
                  className="text-green-600 font-bold hover:underline"
                  disabled={loading}
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-gray-500">Resend OTP in {timer}s</p>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/v1/users/reset-password", {
        newPassword,
        confirmPassword,
      });

      if (response.data.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Reset Password
        </h2>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block text-gray-700">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={loading}
          />
          <span
            className="absolute top-9 right-3 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4 relative">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleResetPassword}
          className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>

      {/* Toast Messages */}
      <ToastContainer />
    </div>
  );
};


export {ForgotPassword, ResetPassword};
