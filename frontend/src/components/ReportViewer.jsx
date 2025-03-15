import axios from "axios";
import { useState, useEffect } from "react";

const ReportViewer = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  // Function to fetch PDF
  const fetchPdf = async () => {
    try {
      const response = await axios.get("/api/v1/reports/", {
        responseType: "blob", // Ensures response is treated as a file
      });
      console.log("PDF response:", response.meassage);
      // Convert Blob to URL and update state
      const url = URL.createObjectURL(response.data);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  // Fetch PDF when component mounts
  useEffect(() => {
    fetchPdf();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
      <h2 className="text-2xl font-bold text-green-800">📄 Our Work Reports</h2>

      {pdfUrl ? (
        <div className="mt-4">
          {/* View PDF */}
          <iframe src={pdfUrl} width="100%" height="400px"></iframe>

          {/* Download PDF */}
          <a
            href={pdfUrl}
            download="DayaSociety_Report.pdf"
            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700"
          >
            Download Report
          </a>
        </div>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
};

export default ReportViewer;
