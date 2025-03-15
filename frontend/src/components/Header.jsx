import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-green-800 text-white p-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
       { /*<img src="/images/logo.png" alt="" className="h-10 w-10"/>*/}
        <h1 className="text-xl font-bold">🌿 Daya Society</h1>
      </div>

      {/* Right: Navigation */}
      <nav>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
