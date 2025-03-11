// components/Layout.js
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Header Section */}
      <header className="flex fixed left-0 top-0 w-full bg-white mb-8 justify-between items-center px-10 py-4 shadow-md">
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-700">Home</Link>
          <Link to="/campaigns" className="text-gray-700">Browse Campaigns</Link>
          <Link to="/success-stories" className="text-gray-700">Success Stories</Link>
          <Link to="/contact" className="text-gray-700">Contact Us</Link>
        </nav>
        <Link to="/support" className="bg-blue-600 text-white px-4 py-2 rounded-md">Support Now</Link>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
