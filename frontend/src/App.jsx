import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-100 text-center">
      <h1 className="text-4xl font-bold p-6">Making a Difference, One Step at a Time</h1>
      <p className="text-lg">Join us in changing lives and building a better future.</p>
      <div className="mt-6 space-x-4">
        <Link to="/about" className="px-6 py-3 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600">About Us</Link>
        <Link to="/impact" className="px-6 py-3 bg-green-500 rounded-lg text-white font-bold hover:bg-green-600">Our Impact</Link>
        <Link to="/campaigns" className="px-6 py-3 bg-purple-500 rounded-lg text-white font-bold hover:bg-purple-600">Campaigns</Link>
      </div>
    </div>
  );
};

const AboutPage = () => <div className="p-10 text-center"><h2 className="text-3xl font-bold">About Us</h2><p>We are committed to making a difference by helping those in need.</p></div>;
const ImpactPage = () => <div className="p-10 text-center"><h2 className="text-3xl font-bold">Our Impact</h2><p>5000+ Lives Changed, 200+ Volunteers</p></div>;
const CampaignsPage = () => <div className="p-10 text-center"><h2 className="text-3xl font-bold">Ongoing Campaigns</h2><p>Supporting communities with various initiatives.</p></div>;
const HelpPage = () => <div className="p-10 text-center"><h2 className="text-3xl font-bold">How You Can Help</h2><p>Join us through donations, volunteering, or partnerships.</p></div>;
const TestimonialsPage = () => <div className="p-10 text-center"><h2 className="text-3xl font-bold">Testimonials</h2><p>"This organization has changed my life for the better."</p></div>;
const NewsPage = () => <div className="p-10 text-center"><h2 className="text-3xl font-bold">Latest News</h2><p>Stay updated with our latest activities.</p></div>;
const GalleryPage = () => <div className="p-10 text-center"><h2 className="text-3xl font-bold">Gallery</h2><p>Explore moments from our initiatives.</p></div>;
const NewsletterPage = () => <div className="p-10 text-center"><h2 className="text-3xl font-bold">Subscribe to Our Newsletter</h2><input type="email" placeholder="Enter your email" className="p-2 border rounded-lg" /><button className="ml-2 px-6 py-2 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600">Subscribe</button></div>;

const NGOApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
      </Routes>
    </Router>
  );
};

export default NGOApp;
