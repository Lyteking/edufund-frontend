import React, {useState} from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from '../assets/Logo'

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full top-0 fixed left-0 flex flex-col h-screen">
      <div className="absolute inset-0 bg-[url('/your-background-image.jpg')] bg-cover bg-center filter blur-md -z-10"></div>
      
      <div className="absolute inset-0 bg-black/50"></div>

      <header className="sticky top-0 left-0 w-full  bg-white z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center pr-8 pl-2 md:px-2 py-2">
          <Link to="/" className="text-xl font-bold text-gray-800">
            <Logo/>
          </Link>
          <button
            className="block md:hidden text-black text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/campaigns" className="text-gray-700 hover:text-gray-900">Browse Campaigns</Link>
          </nav>
          <div className="hidden md:flex justify-between sm:gap-1 md:gap-3">
            <Link to="/signup" className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300">Sign Up</Link>
            <Link to="/login" className="hidden md:block bg-gray-400 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300">Log In</Link>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMenuOpen(false)}>
            <div className="absolute top-0 right-0 w-2/3 h-full bg-white/95 backdrop-blur-lg p-4 flex flex-col items-end" onClick={e => e.stopPropagation()}>
              <button
                className="self-end mb-4 text-xl border-none rounded-lg bg-gray-200 px-2"
                onClick={() => setMenuOpen(false)}
              >
                &times;
              </button>
              <Link to="/" className="text-sm block p-2 hover:bg-gray-200 w-full text-left" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/campaigns" className="text-sm block p-2 hover:bg-gray-200 w-full text-left" onClick={() => setMenuOpen(false)}>Browse Campaign</Link>
              <Link to="/signup" className="text-sm w-full mt-2 block p-2 bg-indigo-600 text-white hover:bg-indigo-700 text-center rounded" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              <Link to="/login" className="text-sm w-full block mt-2 p-2 bg-gray-400 text-white hover:bg-gray-500 text-center rounded" onClick={() => setMenuOpen(false)}>Log In</Link>
            </div>
          </div>
        )}
      </header>

      <main className="overflow-y-auto scrollbar-hidden flex-grow backdrop-blur-sm bg-white/70">
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;