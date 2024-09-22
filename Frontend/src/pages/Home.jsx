import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation for URL handling
import WeatherHeader from '../components/WeatherHeader';
import FoodOptions from '../components/FoodOptions';
import RestaurantList from '../components/RestaurantList';
import Swiper from '../components/Swiper';
import { useSelector } from 'react-redux';

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selected, setSelected] = useState('All'); // Default to 'All'
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  // This function will update both the state and the URL without reloading the page
  const handleCampusChange = (campus) => {
    setSelected(campus); // Update the state (campus selection)
    
    if (campus === 'All') {
      navigate('/'); // Change URL to the home root for 'All'
    } else {
      navigate(`/${campus.toLowerCase()}`); // Change the URL based on campus ('bidholi', 'kandholi')
    }
  };

  // Set the selected campus based on the current URL path
  useEffect(() => {
    if (location.pathname.includes('bidholi')) {
      setSelected('Bidholi');
    } else if (location.pathname.includes('kandholi')) {
      setSelected('Kandholi');
    } else {
      setSelected('All'); // Default to 'All' for home page
    }
  }, [location.pathname]); // This effect runs whenever the URL path changes

  return (
    <div className='overflow-y-scroll min-h-full'>
      <WeatherHeader />
      <Swiper />
      <FoodOptions />

      <div className="flex h-12 gap-3 text-xs justify-center ml-4 mr-4 items-center rounded-2xl">
        <div
          className={`border p-2 rounded-2xl cursor-pointer transition-all duration-300 ${selected === 'All' ? 'bg-green-800 text-white' : 'bg-white text-black hover:bg-blue-100'}`}
          onClick={() => handleCampusChange('All')}
        >
          All
        </div>
        <div
          className={`border p-2 rounded-2xl cursor-pointer transition-all duration-300 ${selected === 'Bidholi' ? 'bg-green-800 text-white' : 'bg-white text-black hover:bg-blue-100'}`}
          onClick={() => handleCampusChange('Bidholi')}
        >
          Bidholi Campus
        </div>
        <div
          className={`border p-2 rounded-2xl cursor-pointer transition-all duration-300 ${selected === 'Kandholi' ? 'bg-green-800 text-white' : 'bg-white text-black hover:bg-blue-100'}`}
          onClick={() => handleCampusChange('Kandholi')}
        >
          Kandholi Campus
        </div>
      </div>

      {/* Pass the selected campus to RestaurantList */}
      <RestaurantList campus={selected} />
    </div>
  );
};

export default Home;

