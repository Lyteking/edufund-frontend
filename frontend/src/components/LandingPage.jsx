import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/landingbg.jpeg';

const FundDream = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
         style={{ 
           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
         }}>
      
      <div className="text-center max-w-2xl px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Fund a Dream, Change a Life</h1>
        <p className="text-lg md:text-xl mb-6">
          Over <span className="font-bold">20 million children</span> in Nigeria are out of school. Your donation can change that.
        </p>
        
        <div className="mb-8">
          <Link to="/signup">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
              Support A Student Today
            </button>
          </Link>
        </div>

        <div className="flex-grow"></div>

        
        <div className="mt-auto">
          <p className="text-sm md:text-base">
            We work directly with schools and teachers to ensure every donation leads to measurable educational impact
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundDream;