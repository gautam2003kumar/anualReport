

import { useState, useEffect } from "react";

import treePlantation from "../assets/tree-5145029_1280.jpg";
import education from "../assets/edu.jpg";
import charity1 from "../assets/hands.jpg";
import tree2 from "../assets/tree2.jpg";
import soil from "../assets/soil.jpg";


const images = [treePlantation, education, tree2, charity1, soil];

const Dashboard = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Changes every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="h-[70vh] flex flex-col items-center justify-center text-center p-8 relative bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
            transition: "opacity 1s ease-in-out",
          }}
        >

        <div className="absolute inset-0 bg-green-900 opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white">Helping People, Changing Lives</h1>
          <p className="text-lg text-white mt-4 max-w-2xl">
            We are dedicated to making the world a better place through tree plantation, blood donation, and community service.
          </p>
          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
            Get Involved
          </button>
        </div>
      </div>

      {/* Information Section with Green Background */}
      <section className="bg-green-100 py-16 text-center px-6">
        <h2 className="text-3xl font-bold text-green-800">Our Mission</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          We aim to create meaningful opportunities for the distressed, disadvantaged, and deprived members of society.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-green-600 py-16 text-center text-white px-6">
        <h2 className="text-3xl font-bold">Core Values</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          <div className="bg-green-800 p-6 rounded-lg w-64 shadow-md">
            <h3 className="text-xl font-semibold">Sustainability</h3>
            <p className="text-sm mt-2">Acting in an environmentally friendly way.</p>
          </div>
          <div className="bg-green-800 p-6 rounded-lg w-64 shadow-md">
            <h3 className="text-xl font-semibold">Gender Equality</h3>
            <p className="text-sm mt-2">Ensuring equal opportunities for all.</p>
          </div>
          <div className="bg-green-800 p-6 rounded-lg w-64 shadow-md">
            <h3 className="text-xl font-semibold">Transparency</h3>
            <p className="text-sm mt-2">Committed to honesty and openness.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
