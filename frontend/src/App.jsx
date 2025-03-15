import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About"; // Import About Page
import Dashboard from "./pages/Dashboard"; // Import Dashboard Page
import Header from "./components/Header"; // Import Header
import Footer from "./components/Footer"; // Import Footer

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer
        description="Daya Society is a non-profit organization committed to transforming lives through sustainable development initiatives."
        socials={[
          { name: "Facebook", link: "https://facebook.com" },
          { name: "Twitter", link: "https://twitter.com" },
          { name: "Instagram", link: "https://instagram.com" },
          { name: "Linkedin", link: "https://linkedin.com" },
        ]}
      />
    </Router>
  );
}

export default App;
