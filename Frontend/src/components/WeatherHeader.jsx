import React,{useState} from "react";
import { FaSearch, FaHeart, FaUserCircle } from "react-icons/fa";
import logo from '../../Images/logo.png';
import heart from '../../Images/heart.svg';
import profile from '../../Images/profile.svg';
import weather from '../../Images/weather.png'

const WeatherHeader = () => {
    const [value,setValue] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  }
//   console.log(value);
  return (
    <div className="p-4 bg-white shadow-md">
      {/* Top bar */}
      <div className="flex items-center justify-between">
       <img src= {heart} alt="" />
        <img
          src={logo} // Replace with your actual logo source
          alt="Logo"
          className="h-8"
        />
        <img src={profile}/>
      </div>

      {/* Search bar */}
      <div className="mt-4 relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
        //   value={value}
            onChange={onChange}
          placeholder="what do you want today? (eg: burger, fries etc)"
          className="w-full pl-10 pr-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Weather and time section */}
      <div className="mt-4 p-4 bg-blue-200 rounded-lg flex items-center min-h-[70px] justify-between bg-cover bg-center w-full relative" style={{ backgroundImage: `url(${weather})` }}>
        <div className="absolute top-7">
          <p className=" text-sm font-bold">Raining 24°C</p>
          <p className="text-xs font-bold">Sun, 10 Aug</p>
        </div>
        <p className="text-sm absolute bottom-2 right-5 font-bold">9:41 PM</p>
      </div>
    </div>
  );
};

export default WeatherHeader;
