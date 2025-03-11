import image from '../assets/landingbg.jpeg';
import { Link } from 'react-router-dom';

const FundDream = () => {
  return (
    <div className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center text-white px-8"
         style={{ backgroundImage: `url(${image})` }}>
      
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Fund a Dream, Change a Life</h1>
        <p className="text-lg md:text-xl mb-6">
          Over <span className="font-bold">20 million children</span> in Nigeria are out of school. Your donation can change that.
        </p>
        <Link to={'/sign-up-selection'}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
          Support a Student Today
        </button>
        </Link>
        
        <p className="mt-6 text-sm md:text-base">
          We work directly with schools and teachers to ensure every donation leads to measurable educational impact.
        </p>
      </div>
    </div>
  );
};

export default FundDream;
