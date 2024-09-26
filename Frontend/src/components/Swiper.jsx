import React from 'react'
import { NavLink } from "react-router-dom";
import confused from '../../Images/confused.svg'
import isolation from '../../Images/Isolation_Mode.png'
import boorigir from '../../Images/boorigir.png'
import burg from '../../Images/bur.svg'
import light from '../../Images/svgvector.svg'
const Swiper = () => {
  return (
    <>
      {/* <div className="relative p-4 mx-4 mt-2 bg-gradient-to-r from-green-800 to-green-500 text-white rounded-md flex items-center shadow-lg "> */}
      {/* Left Text Section */}
      {/* <div className="flex flex-col justify-center mr-4">
        <p className="text-sm font-semibold">
          Swipe right to find your
        </p>
        <p className="text-lg font-bold">
          PERFECT FLAVOUR MATCH!
        </p>
        <p className="text-xs mt-2">
          Click here and start swiping to satisfy your taste buds...
        </p>
      </div> */}

      {/* Right Image Section */}
      {/* <div className="ml-auto">
        <img
          src={confused} 
          alt="Confused Character"
          className="h-20"
        />
      </div> */}


      {/* Button */}
      {/* <NavLink to="/food-filter" className="inline-block">
        <button className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-md shadow-lg hover:bg-yellow-300 transition duration-300">
          START SWIPING
        </button>
      </NavLink> */}
      {/* </div> */}
      <div className='flex' style={{ backgroundImage: `url(${isolation})` }}>
        <div className='w-[40vw] h-[150px] flex justify-center items-center'>
          <div className='w-[30vw] relative h-[160px]'>
            <img className='w-full h-full object-cover' src={burg} alt="" />
            <div className="absolute left-10 top-11 ">
              <img src={light} alt="" />
            </div>
          </div>


        </div>
        <div className='w-[60vw] flex flex-col justify-center gap-1 h-[161px]'>
          <p className='text-base font-semibold text-[#00643c]'>Can't decide what to eat?</p>
          <p className='font-medium text-sm '>Lets find your taste bud's
            PERFECT MATCH!</p>
          <NavLink to="/food-filter" className="inline-block">
            <button className="bg-[#5f99e2] text-white font-bold py-2 px-6 rounded-xl shadow-lg hover:bg-blue-600 transition duration-300">
              START {">>"}
            </button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Swiper
