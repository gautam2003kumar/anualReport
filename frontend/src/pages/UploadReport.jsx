import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadReport = () => {
  const [file, setFile] = useState(null);
  const [session, setSession] = useState("");
  const [isUploading, setIsUploading] = useState(false); // <-- NEW STATE
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSessionChange = (e) => {
    setSession(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !session) {
      toast.error("Please select a file and enter a session.");
      return;
    }

    setIsUploading(true); // <-- START LOADING STATE

    const formData = new FormData();
    formData.append("reportFile", file);
    formData.append("session", session);

    try {
      const res = await axios.post(
        "/api/v1/reports/publishReport",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Report uploaded successfully!", {
          position: "bottom-left",
          autoClose: 2000,
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload report. Please try again.");
    } finally {
      setIsUploading(false); // <-- STOP LOADING STATE
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Annual Report</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Select Report PDF:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Session (e.g., 2024-25):</label>
        <input
          type="text"
          value={session}
          onChange={handleSessionChange}
          placeholder="Enter session year"
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isUploading} // Disable button while uploading
        >
          {isUploading ? "Uploading..." : "Upload Report"}
        </button>
      </form>
    </div>
  );
};

export default UploadReport;
