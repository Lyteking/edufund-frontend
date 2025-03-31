import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/image.png';
import image2 from '../assets/image2.png'
import image3 from '../assets/image3.png'
import recfund from '../assets/recfund.png'
import crecamp from '../assets/crecamp.png'
import regimg from '../assets/regimg.png'
import Logo from '../assets/Logo.jsx'

const FundDream = () => {
  return (
    <>
    <div className="relative w-full h-screen bg-cover bg-center flex items-center text-white"
         style={{ 
           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
         }}>
      <div className='flex grid-cols-2 justify-between w-full items-center p-4 sm:p-8'>
        <div className="text-start col-span-1 max-w-2xl">
        <h1 className="text-2xl sm:text-4xl md:text-5xl mb-4"><strong>Education Shouldn’t be  a Privilege</strong> - Help Nigerian  Students stay in school</h1>
        <p className="text-md sm:text-lg md:text-xl mb-6">
          Over <span className="font-bold">20 million children</span> in Nigeria are out of school. Your donation can change that.
        </p>
        
        <div className="w-full grid-col-2 flex items-center mb-8">
          <Link to="/campaigns">
            <button className="bg-reg text-sm sm:text-md md:text-lg col-span-1 w-full flex gap-2 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-2xl transition duration-300">
            <svg className='hidden sm:block' width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.49892 13.18V17.18L12.4989 21L19.4989 17.18V13.18L12.4989 17L5.49892 13.18ZM12.4989 3L1.49892 9L12.4989 15L21.4989 10.09V17H23.4989V9L12.4989 3Z" fill="white"/>
</svg> Register Your School        
            </button>
          </Link>
          <Link to='/campaigns'>
          <div className='flex ml-4 gap-2 col-span-1 w-full'>
          <svg width="20" className='hidden sm:block' height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1632 16.8369L14.453 13.1251C15.5655 11.6755 16.0848 9.85701 15.9058 8.03853C15.7267 6.22005 14.8627 4.53777 13.4889 3.33294C12.1151 2.12811 10.3344 1.49096 8.50813 1.55073C6.68184 1.6105 4.94666 2.36272 3.65458 3.65479C2.36251 4.94687 1.61029 6.68205 1.55052 8.50834C1.49075 10.3346 2.1279 12.1153 3.33273 13.4891C4.53756 14.8629 6.21984 15.7269 8.03831 15.906C9.85679 16.085 11.6753 15.5657 13.1249 14.4533L16.8382 18.1673C16.9254 18.2545 17.0289 18.3237 17.1429 18.3709C17.2568 18.4181 17.3789 18.4424 17.5023 18.4424C17.6256 18.4424 17.7477 18.4181 17.8617 18.3709C17.9756 18.3237 18.0791 18.2545 18.1663 18.1673C18.2535 18.0801 18.3227 17.9766 18.3699 17.8626C18.4171 17.7487 18.4414 17.6266 18.4414 17.5033C18.4414 17.3799 18.4171 17.2578 18.3699 17.1439C18.3227 17.0299 18.2535 16.9264 18.1663 16.8392L18.1632 16.8369ZM3.43742 8.75014C3.43742 7.69942 3.749 6.67231 4.33274 5.79867C4.91649 4.92503 5.74619 4.24412 6.71692 3.84203C7.68765 3.43994 8.75582 3.33473 9.78634 3.53972C10.8169 3.7447 11.7635 4.25067 12.5064 4.99363C13.2494 5.7366 13.7554 6.6832 13.9603 7.71372C14.1653 8.74424 14.0601 9.81241 13.658 10.7831C13.2559 11.7539 12.575 12.5836 11.7014 13.1673C10.8278 13.7511 9.80064 14.0626 8.74992 14.0626C7.34141 14.0612 5.99099 13.501 4.99502 12.505C3.99904 11.5091 3.43887 10.1587 3.43742 8.75014Z" fill="white"/>
</svg>
<p className='text-sm sm:text-md md:text-lg'>Explore Campaigns</p>
</div>
          </Link>
        </div>     
      </div>
      <div className='hidden lg:flex col-span-1 h-full lg:justify-end md:mr-20'>
      <img 
  src={image3} 
  alt="Image"
  className="w-80 h-80  object-contain"
/>

      </div>
      </div>      
      <div className="w-full grid grid-cols-2 p-4 md:p-8 md:grid-cols-4 gap-8 mt-18 absolute bottom-8 text-center">
  <div>
    <h1 className="font-bold text-2xl md:text-big">₦2.5M+</h1>
    <h1>Raised for Students</h1>
  </div>
  <div>
    <h1 className="font-bold text-2xl md:text-big">120+</h1>
    <h1>Verified Public Schools</h1>
  </div>
  <div>
    <h1 className="font-bold text-2xl md:text-big">97%</h1>
    <h1>Successful Campaign Rate</h1>
  </div>
  <div>
    <h1 className="font-bold text-2xl md:text-big">1.2k+</h1>
    <h1>Active Donors</h1>
  </div>
</div>

    </div>
    <div className="bg-white py-24 px-12 lg:px-36">
      <div className="w-full mx-auto flex-col justify-center items-center text-start">
        <h2 className="text-md sm:text-start text-center sm:text-2xl w-full font-semibold text-gray-900 underline decoration-4 underline-offset-8 decoration-orange-400">Simple Steps to Impact</h2>
        
      </div>

      <div className="flex mt-12 justify-center items-center space-x-4">
  <span className="font-bold text-black">For Schools</span>
  <span className="border-l border-gray-400 h-5"></span>
  <span className="text-gray-500">For Donors</span>
</div>


<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-12">
  <div className="relative flex flex-col items-center bg-white shadow-lg p-6 rounded-2xl text-center w-full md:w-1/3">
    <img src={regimg} alt="Register & Verify" className="w-24 h-24 mb-4" />
    <h2 className="font-bold text-lg">Register & Verify</h2>
    <p className="text-gray-500 mt-2">
      Get your school onboarded and validated to start providing verified campaigns.
    </p>
    <div className="hidden md:block absolute top-1/2 right-[-40px] w-20 border-dashed border-2 border-yellow-300"></div>
  </div>

  <div className="relative flex flex-col items-center bg-white shadow-lg p-6 rounded-2xl text-center w-full md:w-1/3 md:translate-y-18 mt-12 sm:mt-0">
    <img src={crecamp} alt="Create a Campaign" className="w-24 h-24 mb-4" />
    <h2 className="font-bold text-lg">Create a Campaign</h2>
    <p className="text-gray-500 mt-2">
      Launch need-based student campaigns tailored to your school's real challenges.
    </p>
    <div className="hidden md:block absolute top-1/2 right-[-40px] w-20 border-dashed border-2 border-yellow-300"></div>
  </div>

  <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-2xl text-center w-full md:w-1/3 mt-12 sm:mt-0">
    <img src={recfund} alt="Receive Funds" className="w-24 h-24 mb-4" />
    <h2 className="font-bold text-lg">Receive Funds</h2>
    <p className="text-gray-500 mt-2">
      Once your campaign reaches its target, funds are disbursed directly to your school.
    </p>
  </div>
</div>

    </div>

    <div className="flex flex-col px-6 lg:px-24 py-12 md:flex-row bg-white md:items-center gap-6">
    <div className="w-full md:w-1/2">
    <img 
    src={image2} 
    className="w-full h-100 object-cover rounded-lg"
    alt="Responsive image"
  />
</div>
      <div className="w-full md:w-1/2 py-6 md:p-2 text-wrap gap-4 text-start">
        <h1 className="text-sm md:text-1xl font-bold text-gray-900 mb-6">
          Supporting Nigerian Students Through Novel-Based Education Campaigns
        </h1>
        
        <div className="flex mb-4 item-start">
          <p className="text-xl md:text-3xl font-bold text-yellow-300 item-start">
            FUNDING EDUCATION, RESTORING FUTURES, 
          <span className="text-xl md:text-3xl text-black sm:text-xl font-bold">
           ONE CAMPAIGN AT A TIME</span>
          </p>
        </div>

        <div className="text-gray-700 text-base sm:text-lg space-y-4">
          <p>
          EduFund is a mission-driven platform built to tackle one of Nigeria’s biggest educational crises  access. With over 20 million children out of school, EduFund empowers public secondary schools to raise funds for essentials like uniforms, textbooks, and fees not for individuals, but for community-based student needs. By partnering directly with schools and ensuring verified, need-based campaigns, EduFund creates a transparent bridge between those who want to give and those who need support.
          </p>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default FundDream;