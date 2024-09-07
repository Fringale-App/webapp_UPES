import React, { useEffect } from 'react';
import WeatherHeader from '../components/WeatherHeader';
import FoodOptions from '../components/FoodOptions';
import RestaurantList from '../components/RestaurantList';
import Swiper from '../components/Swiper';

const Home = () => {

  // Function to get the user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Call function to send the location to backend
          updateLocationOnBackend(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // Function to send location to backend
  const updateLocationOnBackend = async (latitude, longitude) => {
    try {
      const response = await fetch('http://localhost:3000/api/user/update-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId, // Pass the user's ID here (you may get this from localStorage or state)
          latitude,
          longitude,
        }),
      });

      const data = await response.json();  // Check the response format

      if (data.success) {
        console.log("Location updated successfully");
      } else {
        console.log("Failed to update location");
      }
    } catch (error) {
      console.error("Error sending location:", error);
    }
  };


  // Call getUserLocation when the component mounts
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className='overflow-y-scroll min-h-full'>
      <WeatherHeader />
      <Swiper />
      <FoodOptions />
      <RestaurantList />
    </div>
  );
};

export default Home;
