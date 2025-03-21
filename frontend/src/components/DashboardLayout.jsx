import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from '../assets/Logo';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authTokens, logout, isAuthenticated, user } = useAuth(); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <div className="w-full top-0 fixed left-0 flex flex-col h-screen">
      <header className="sticky top-0 left-0 w-full bg-white z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center pr-8 pl-2 md:px-2 py-2">
          <Link to="./dashboard" className="text-xl font-bold text-gray-800">
            <Logo />
          </Link>

          {isAuthenticated && ( 
            <div className="hidden md:flex justify-between sm:gap-1 md:gap-3">
              <button
                onClick={handleLogout}
                className="flex bg-gray-400 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="overflow-y-auto scrollbar-hidden flex-grow">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;