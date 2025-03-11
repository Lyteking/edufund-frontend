import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="w-full top-0 fixed left-0 flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="sticky top-0 left-0 w-full bg-white z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-xl font-bold text-gray-800">Homepage</Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/campaigns" className="text-gray-700 hover:text-gray-900">Browse Campaigns</Link>
            <Link to="/success-stories" className="text-gray-700 hover:text-gray-900">Success Stories</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact Us</Link>
          </nav>
          <Link to="/support" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300">Support Now</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;