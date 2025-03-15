import { useState, useEffect } from "react";
import ReportViewer from "../components/ReportViewer";

const imgs = [
  "https://cdn.pixabay.com/photo/2016/11/08/05/20/tree-1803928_1280.jpg", // Tree Plantation 🌳
  "https://cdn.pixabay.com/photo/2018/07/11/10/43/blood-donation-3536132_1280.jpg", // Blood Donation 🩸
  "https://cdn.pixabay.com/photo/2016/03/27/19/33/hands-1280428_1280.jpg", // Charity & Helping Hands 🤝
  "https://cdn.pixabay.com/photo/2017/03/27/13/51/children-2170400_1280.jpg", // Education Support 📚
];


const images = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",  
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba"
];

const  Dashboard = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Changes every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center p-8 relative bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <div className="absolute inset-0 bg-green-900 opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white">Helping People, Changing Lives</h1>
          <p className="text-lg text-white mt-4 max-w-2xl">
            We are dedicated to making the world a better place through tree plantation, blood donation, and community service.
          </p>
          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
            Get Involved
          </button>
        </div>

        {/* call ReportViewer component */}

        <div className="mt-10">
          <ReportViewer/>
        </div>
        
      </div>
    </>
  );
}

export default Dashboard;