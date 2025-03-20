import React, {useState} from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/Logo'

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full top-0 fixed left-0 flex flex-col h-screen">
      <header className="sticky top-0 left-0 w-full bg-white z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center pr-8 pl-2  md:px-2 py-2">
          <Link to="/" className="text-xl font-bold text-gray-800"><Logo/>
</Link>
<button
          className=" block md:hidden text-black text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/campaigns" className="text-gray-700 hover:text-gray-900">Browse Campaigns</Link>
            <Link to="/success-stories" className="text-gray-700 hover:text-gray-900">Success Stories</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact Us</Link>
          </nav>
          <div className=" hidden md:flex justify-between sm:gap-1 md:gap-3">
            <Link to="/signup" className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300">Sign up</Link>
            <Link to="/login" className="hidden md:block bg-gray-400 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300">Log in</Link>
          </div>
        </div>
        {menuOpen && (
        <div className="md:hidden fixed top-0 right-0  bg-white drop-shadow-3xl p-4 flex flex-col items-end z-50">
          <button
            className="self-end mb-4 text-xl border-none rounded-lg bg-gray-200 px-2"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
          <Link to="/" className="text-sm block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="text-sm block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Browse Campaign</Link>
          <Link to="/about" className="text-sm block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Success Stories</Link>
          <Link to="/contact" className="text-sm block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <Link to="/signup" className="text-sm block p-2 bg-indigo-600 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Support Now</Link>
        </div>
      )}
      </header>

      <main className="overflow-y-auto scrollbar-hidden flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;