import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/order');
  };

  return (
    <div className="w-full min-h-screen bg-gray-800 text-white flex items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl w-full">
        
        {/* Text Section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
        <p className="uppercase tracking-widest text-sm mb-2 text-yellow-300">Urban Edge</p>
          <h1 className="text-9xl md:text-10xl font-bold font-[cursive] mb-4">
            DealNova
          </h1>
          <p className="text-2xl md:text-3xl font-serif mb-3">Explore and Discover</p>
          <p className="text-2xl md:text-3xl font-serif mb-8">Your own style</p>
          <button
            onClick={handleShopNow}
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Shop Now
            <div className="text-xs">just one click checkout away</div>
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/images/hero-fashion.jpeg" // put your image here: public/images/hero-fashion.jpeg
            alt="Fashion Model"
            className="rounded-3xl object-cover w-72 md:w-[500px] shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;









<p className="uppercase tracking-widest text-sm mb-2 text-yellow-300">Urban Edge</p>