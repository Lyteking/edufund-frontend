import image from '../assets/signupbg.jpeg'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const SignUpSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-733 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
              <div className="h-full flex flex-col justify-center items-start w-full p-10 text-left text-white">
      
                <h1 className="text-4xl font-bold mb-4">Join the Movement to Change Education in Nigeria</h1>
                <p className="text-lg">
                  Education is the foundation for a better future. Your support can provide essential learning materials, fund school programs, and create opportunities for children to reach their full potential.
                </p>
              </div>
            </div>

      
      <div className="w-full flex-col justify-center items-center h-screen bg-gray-100">
        <div className="w-full h-screen flex-col px-16 py-35 items-center bg-white rounded-lg shadow-md overflow-auto scrollbar-hidden">
        <p className="text-lg">Are you signing up as a Sponsor or a School?</p>
        <Link to={'/sponsor-sign-up'}>
          <div className='flex-col transform transition duration-300 hover:scale-110 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bg-gray-100 rounded-full m-8 mb-2 p-8 size-50">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
</svg>

  <button>
          Sponsor
        </button>
          </div>
        </Link>
          
          <Link to={'/school-sign-up'}>
          <div className='mt-18 flex-col text-center transform transition duration-300 hover:scale-110 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bg-gray-100 rounded-full mb-2 p-8 size-50 m-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>
 <button>
          School
        </button>
          </div>
          </Link>
          
       
      </div>
      </div>
    </div>
  );
};

export default SignUpSelection;
