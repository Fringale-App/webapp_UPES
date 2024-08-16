import React from 'react'
import { NavLink } from "react-router-dom";
import confused from '../../Images/confused.svg'
const Swiper = () => {
  return (
    <>
      <div className="relative p-4 mx-4 mt-2 bg-gradient-to-r from-green-800 to-green-500 text-white rounded-md flex items-center shadow-lg ">
      {/* Left Text Section */}
      <div className="flex flex-col justify-center mr-4">
        <p className="text-sm font-semibold">
          Swipe right to find your
        </p>
        <p className="text-lg font-bold">
          PERFECT FLAVOUR MATCH!
        </p>
        <p className="text-xs mt-2">
          Click here and start swiping to satisfy your taste buds...
        </p>
      </div>

      {/* Right Image Section */}
      <div className="ml-auto">
        <img
          src={confused} 
          alt="Confused Character"
          className="h-20"
        />
      </div>
    
      
      {/* Button */}
      <NavLink to="/food-filter" className="inline-block">
        <button className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-md shadow-lg hover:bg-yellow-300 transition duration-300">
          START SWIPING
        </button>
      </NavLink>
    </div>
    </>
  )
}

export default Swiper
