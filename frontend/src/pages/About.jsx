import React from "react";

const About = () => {
  return (
    <>
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-green-700 mb-6">📌 About Daya Society</h1>
      <p className="text-lg text-gray-700 text-center max-w-4xl">
        Daya Society is a non-profit organization dedicated to creating a sustainable and equitable world. 
        We empower underprivileged communities by providing access to healthcare, livelihood support, education, 
        and environmental conservation initiatives. Since 2004, we have been at the forefront of social change, ensuring 
        that no one is left behind in the journey toward a better future.
      </p>

      {/* Mission Section */}
      <div className="mt-10 bg-white shadow-md p-6 rounded-lg max-w-4xl text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">🎯 Our Mission</h2>
        <ul className="text-gray-700 list-disc list-inside text-left">
          <li>✔ Providing quality healthcare services to those in need</li>
          <li>✔ Encouraging self-sufficiency through livelihood programs</li>
          <li>✔ Supporting child development and education</li>
          <li>✔ Empowering women through financial independence</li>
          <li>✔ Responding to natural disasters with timely relief efforts</li>
          <li>✔ Protecting the environment through tree plantations and conservation programs</li>
        </ul>
      </div>

      {/* Impact Section */}
      <div className="mt-10 bg-white shadow-md p-6 rounded-lg max-w-4xl text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">🌱 Our Impact</h2>
        <ul className="text-gray-700 list-disc list-inside text-left">
          <li>📌 <strong>Healthcare Support:</strong> Over <span className="text-green-600 font-bold">10,000 people</span> have benefited from our free medical camps and health awareness programs.</li>
          <li>📌 <strong>Livelihood Programs:</strong> Skill training for <span className="text-green-600 font-bold">5,000+ individuals</span>, helping them become financially independent.</li>
          <li>📌 <strong>Women Empowerment:</strong> More than <span className="text-green-600 font-bold">800 women</span> have started small businesses with our micro-financing initiatives.</li>
          <li>📌 <strong>Environmental Conservation:</strong> Planted over <span className="text-green-600 font-bold">50,000 trees</span> and cleaned up polluted areas in multiple cities.</li>
          <li>📌 <strong>Disaster Relief:</strong> Delivered essential aid to <span className="text-green-600 font-bold">20,000 disaster-affected families</span> during floods, earthquakes, and pandemics.</li>
        </ul>
      </div>

      {/* How You Can Help Section */}
      <div className="mt-10 bg-white shadow-md p-6 rounded-lg max-w-4xl text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">🤝 How You Can Help</h2>
        <p className="text-gray-700 mb-4">
          You can be a part of this transformative journey in the following ways:
        </p>
        <ul className="text-gray-700 list-disc list-inside text-left">
          <li>🔹 <strong>Volunteer</strong> – Join us in various community-driven initiatives.</li>
          <li>🔹 <strong>Donate</strong> – Every contribution helps us reach more people in need.</li>
          <li>🔹 <strong>Spread Awareness</strong> – Share our mission and inspire more changemakers.</li>
          <li>🔹 <strong>Corporate Partnerships</strong> – Organizations can collaborate for CSR initiatives.</li>
        </ul>
      </div>

      {/* Join Us Section */}
      <div className="mt-10 bg-green-700 text-white shadow-md p-6 rounded-lg max-w-4xl text-center">
        <h2 className="text-2xl font-semibold mb-4">📢 Join Us Today!</h2>
        <p className="mb-4">
          At <span className="font-bold">Daya Society</span>, we believe that small efforts create big impacts. 
          Together, we can build a more inclusive and sustainable future for all.
        </p>
        <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          Contact Us
        </button>
      </div>
    </div>
    </>
  );
};

export  default About;
