const AboutPage = () => {
  return (
    <div className="p-10 bg-gray-100 text-center">
      <h1 className="text-5xl font-extrabold text-blue-700">About Daya Society</h1>
      <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
        Daya Society is a non-profit organization committed to transforming lives through sustainable development initiatives.
        Our focus areas include healthcare, livelihood support, women empowerment, child development, disaster management,
        and environmental conservation.
      </p>

      <div className="mt-8 text-left bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700">Our Mission</h2>
        <p className="text-gray-700 mt-2">
          We strive to uplift underprivileged communities by providing essential services and resources. By addressing
          key social challenges, we aim to create a self-sufficient and empowered society.
        </p>

        <h2 className="text-3xl font-bold mt-6 text-purple-700">Our Impact</h2>
        <p className="text-gray-700 mt-2">
          Since our inception in 2004, we have positively impacted over <span className="font-bold">5,000 lives</span>.
          Our healthcare programs have facilitated better medical access, while our livelihood projects support over <span className="font-bold">4,200 rural farmers</span>.
          Through self-help groups, <span className="font-bold">600+ women</span> have gained financial independence.
        </p>

        <h2 className="text-3xl font-bold mt-6 text-blue-700">How You Can Help</h2>
        <p className="text-gray-700 mt-2">
          Real change happens when people come together. You can support our cause by volunteering, donating, or spreading awareness.
          Every effort counts in making a difference.
        </p>
      </div>

      <div className="mt-8 bg-blue-100 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700">Get in Touch</h2>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Arpan Kumar, Secretary</span> <br />
          Daya Foundation <br />
          268A, Madhopur, Basudeopur, Munger
        </p>
        <p className="text-gray-700 mt-2">
          Email: <a href="mailto:mdayasociety@gmail.com" className="text-blue-500">mdayasociety@gmail.com</a>, 
          <a href="mailto:kumararpan74@gmail.com" className="text-blue-500"> kumararpan74@gmail.com</a>
        </p>
        <p className="text-gray-700 mt-2">
          Mobile: <a href="tel:7004176432" className="text-blue-500">7004176432</a>, 
          <a href="tel:9431418843" className="text-blue-500"> 9431418843</a>
        </p>
      </div>
    </div>
  );
};

export { AboutPage };
