import axios from "axios";
import { useEffect, useState } from "react";

const ReportsPage = ({ user }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("/api/v1/reports/");
      setReports(res.data.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await axios.delete(`/api/v1/reports/${reportId}`);
      setReports(reports.filter(report => report._id !== reportId));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 p-6">
      <h2 className="text-3xl font-bold mb-6">Annual Reports</h2>

      <div className="w-full max-w-3xl space-y-4">
        {reports.length === 0 ? (
          <p className="text-gray-600 text-center">No reports available.</p>
        ) : (
          reports.map(report => (
            <div key={report._id} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Session: {report.session}</p>
                {/*<p className="text-sm text-gray-500">Views: {report.views}</p> */}
              </div>
              
              <div className="flex space-x-3">
                <a href={report.reportFile} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  View
                </a>
                <a href={report.reportFile} download className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Download
                </a>
                {user?.isAdmin && (
                  <button onClick={() => handleDelete(report._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
