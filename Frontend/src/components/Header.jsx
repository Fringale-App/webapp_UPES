import React from 'react';
import logo from '../../Images/logo.png';
import { TfiHeart } from "react-icons/tfi";
import { RiUserLine } from "react-icons/ri";

function Header() {
  return (
    <div>
      <div
        className="flex justify-between items-center py-4 px-4"
        style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)' }}
      >
        <TfiHeart className="text-[rgba(0,100,60,1)] h-[40px] w-[40px] transform scale-110" />
        <div className='h-[40px] w-[157px] overflow-hidden object-cover' >
          <img className="w-full h-full" src={logo} alt="" />
        </div>
        <RiUserLine className="text-[rgba(0,100,60,1)] h-[40px] w-[40px] transform scale-110" />
      </div>
     
    

    </div>

  );
}

export default Header;
